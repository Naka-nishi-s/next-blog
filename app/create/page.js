"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";

import { useEffect, useRef } from "react";

const Page = () => {
  // Quillを入れる場所を確保
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

  const getText = async () => {
    // コンテンツ取得
    const contents = await quillInstance.current.getContents();

    // fetchでデータをDynamoDBに飛ばす
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contents),
    });

    if (response.status === 200) {
      alert("完了！");
    } else {
      alert("残念！");
    }
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
        <button onClick={getText}>記事内容を確認</button>
      </div>
      <div>
        <div ref={quillElement}></div>
      </div>
    </div>
  );
};

export default Page;
