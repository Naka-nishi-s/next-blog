"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

const Page = () => {
  // ルーターを作成
  const router = useRouter();

  // タイトルと著者名を格納
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Quillの記事内容を入れる場所を確保
  const quillElement = useRef();
  // Quillの本体を格納
  const quillInstance = useRef();

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
   * Quillをリセットする機能
   * @param なし
   * @returns なし
   */
  const deleteInstance = () => {
    // 削除チェック
    const deleteCheck = confirm("本当に削除しますか？");

    // OKを選択で削除
    if (!deleteCheck) {
      return;
    } else {
      if (quillInstance.current) {
        quillInstance.current.setText("");
      }
    }
  };

  /**
   * アラートする
   * @param なし
   * @returns なし
   */
  const alertError = () => {
    alert("うまくいきませんでした。\n時間を置いて再度お試しください。");
  };

  const getText = async () => {
    // コンテンツ取得
    const content = await quillInstance.current.getContents();

    // 現在時刻を設定
    const updateDate = await new Date();

    // サーバに送るjsonを作成
    const sendJson = {
      title,
      author,
      content: content.ops,
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
   * タイトルを変更する
   * @param {*} e
   */
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  /**
   * 著者を変更する
   * @param {*} e
   */
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3 p-3 bg-white h-full">
      <div className="text-end">
        <button
          onClick={deleteInstance}
          className="rounded-full px-4 py-3 text-slate-50 bg-red-400"
        >
          記事を削除する
        </button>
      </div>
      <div>
        <label>
          タイトル：
          <input
            type="text"
            className="border-2"
            value={title}
            onChange={handleChangeTitle}
          />
        </label>
        <label>
          著者：
          <input
            type="text"
            className="border-2"
            value={author}
            onChange={handleChangeAuthor}
          />
        </label>

        <button onClick={getText}>記事を送信する</button>
      </div>
      <div>
        <div ref={quillElement}></div>
      </div>
    </div>
  );
};

export default Page;
