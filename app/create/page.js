"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import Image from "next/image";
import { v4 as uuidV4 } from "uuid";

const Page = () => {
  // ルーターを作成
  const router = useRouter();

  // タイトル・著者名・画像・画像のプレビュー用URL
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectImage, setSelectImage] = useState(null);
  const [selectImageURL, setSelectImageURL] = useState(null);

  // Quillの記事内容を入れる場所を確保
  const quillElement = useRef();
  // Quillの本体を格納
  const quillInstance = useRef();

  // 画像名をハンドルする
  const imageNameRef = useRef();

  // 初期設定：Quillのひな型を作る
  useEffect(() => {
    // Quillのオプション設定
    const options = {
      debug: "info",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["list", "indent"],
          ["link", "image"],
          ["color"],
        ],
      },
      placeholder: "文章を入力してください",
      theme: "snow",
    };

    // Quillのインスタンスを作成
    quillInstance.current = new Quill(quillElement.current, options);
  }, []);

  /**
   * エラー時のアラートを作成
   * @param なし
   * @returns なし
   */
  const alertError = () => {
    alert("うまくいきませんでした。\n時間を置いて再度お試しください。");
  };

  /**
   * S3に画像を保存する
   */
  const storeDataToS3 = async () => {
    // サーバに送るパラメータを設定
    const param = {
      fileName: selectImage.name,
    };

    // サーバにプリサインURLを依頼するリクエストを送る
    const response = await fetch("/api/getPresignedURL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });

    // プリサインURLを取得
    const presignedURLForPUT = await response.text();

    // プリサインURLを使用してS3にアップロード
    const uploadResponse = await fetch(presignedURLForPUT, {
      method: "PUT",
      headers: {
        "Content-Type": selectImage.type,
      },
      body: selectImage,
    });

    // S3への保存が失敗した場合は終了する
    if (!uploadResponse.ok) return alertError();
  };

  /**
   * 入力した情報を取得し、DynamoDBに保存する処理
   * @param なし
   * @returns なし
   *
   * - 正常時：何も返さない
   * - エラー時: { @see alertError }を呼び出す
   */
  const storeDataToDB = async () => {
    // 記事内容を取得
    const content = await quillInstance.current.getContents();

    // 現在時刻を設定
    const updateDate = await new Date();

    // サーバに送るjsonを作成
    const sendJson = {
      title,
      author,
      content: content.ops,
      imageData: selectImage.name,
      updateDate: updateDate.toLocaleString(),
    };

    // fetchでデータをDynamoDBに飛ばす;
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendJson),
    });

    // fetch中にエラー起こったらアラートする
    if (!response.ok) {
      return alertError();
    }

    if (response.status !== 204) {
      // ステータスコードが204以外(異常終了のとき)
      // レスポンスをJSONに変える
      const data = await response.json();

      // エラーメッセージを表示
      console.log(data.error);
      return alertError();
    } else {
      // 正常終了のとき
      // アラートしてトップにリダイレクトする
      alert("記事の保存に成功しました。\nトップに戻ります。");
      router.push("/top");
    }
  };

  /**
   * 画像はS3に、タイトル情報などはDynamoDBに保存する
   */
  const storeDataToAWS = () => {
    // 画像がなければ終了
    if (!selectImage) return alertError();

    //TODO: タイトルや著者の空欄チェック

    storeDataToS3();
    storeDataToDB();
  };

  /**
   * タイトルを変更する
   * @param e イベント
   */
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  /**
   * 著者を変更する
   * @param e イベント
   */
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };

  /**
   * 選択した画像を読み込み、画像本体と画像のURLを格納する。
   * @param e イベント
   * @returns なし
   */
  const handleImageChange = async (e) => {
    // 選択されたファイルが画像ファイル以外の時はクリアして終了
    if (!e.target.files[0].type.startsWith("image/")) {
      clearImage();
      return alert("画像ファイルを選択してください。");
    }

    // 画像の先頭にランダム値を付与
    const uuid = await uuidV4();
    const name = `${uuid}_${e.target.files[0].name}`;

    // ランダム値を付与した新しいファイルを作成
    const newImage = new File([e.target.files[0]], name, {
      type: e.target.files[0].type,
    });

    setSelectImage(newImage);
    setSelectImageURL(URL.createObjectURL(newImage));
  };

  /**
   * 選択した画像名と、画像のプレビューを消す。
   * @param なし
   * @returns なし
   */
  const clearImage = () => {
    imageNameRef.current.value = "";
    setSelectImage(null);
    setSelectImageURL(null);
  };

  return (
    <div className="flex flex-col gap-10 p-3 bg-white h-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="mb-2 font-bold text-lg text-gray-900">
            タイトル：
          </label>
          <input
            type="text"
            className="border-2 border-gray-200 rounded p-2"
            value={title}
            onChange={handleChangeTitle}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-bold text-lg text-gray-900">著者：</label>
          <input
            type="text"
            className="border-2 border-gray-200 rounded p-2"
            value={author}
            onChange={handleChangeAuthor}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-bold text-lg text-gray-900">
            トップ画像：
          </label>
          <input
            type="file"
            className="border-2 border-gray-200 rounded p-2"
            onChange={handleImageChange}
            ref={imageNameRef}
            accept="image/*"
          />
          <div>
            {selectImageURL && (
              <Image
                className="mt-2"
                src={selectImageURL}
                width={200}
                height={200}
                alt="preview"
              />
            )}
          </div>
          <button
            onClick={clearImage}
            className="mt-2 rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            画像をクリア
          </button>
        </div>
      </div>
      <div>
        <div ref={quillElement}></div>
      </div>
      <button
        onClick={storeDataToAWS}
        className="rounded my-10 px-4 py-3 bg-green-500 text-white hover:bg-green-600 transition duration-200"
      >
        記事を送信する
      </button>
    </div>
  );
};

export default Page;
