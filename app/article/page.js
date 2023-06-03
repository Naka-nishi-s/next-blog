"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useEffect, useState } from "react";

const Page = () => {
  // リダイレクト用のルーター
  const router = useRouter();
  // クエリを取り出す用の関数
  const params = useSearchParams();

  // 画像情報
  const [imageURL, setImageURL] = useState("");
  // 記事情報
  const [articles, setArticles] = useState("");
  // html情報
  const [htmlText, setHtmlText] = useState("");

  /**
   * topページにリダイレクトする
   * @param なし
   * @returns なし
   */
  const redirectToTop = () => {
    router.push("/top");
  };

  /**
   * DynamoDBから文章データを取得して表示
   * @param なし
   * @return なし
   */
  const setParamFromDB = async () => {
    // 記事データ取得
    const articlesData = await fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: params.get("id"),
        Title: params.get("title"),
      }),
    });

    // fetchが失敗したらtopにリダイレクト
    if (!articlesData.ok) {
      redirectToTop();
    }

    // 取得した文字列型の記事データをjsonに修正
    const article = await articlesData.json();

    // 画像取得
    const imageResponse = await fetch("/api/gazou", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: article.ImageData.S }),
    });

    // 画像へのURL
    const imageURL = await imageResponse.text();
    setImageURL(imageURL);

    // サーバー側でエラーが起こった場合はerrorにエラーメッセージが入っている
    // その場合はtopにリダイレクト
    if (article.error) {
      //TODO エラーを404に渡して表示させてあげるとGood
      alert(article.error);
      redirectToTop();
    }

    // Contentのみ取り出す、その際にparseする
    const content = await JSON.parse(article.Content.S);

    // HTMLにコンバートする
    let cfg = {};
    const converter = new QuillDeltaToHtmlConverter(content, cfg);
    const html = await converter.convert();

    // HTMLをセットする
    setHtmlText(html);
    // 記事データを挿入
    setArticles(article);
  };

  useEffect(() => {
    setParamFromDB();
    // setImageURLFromS3();
  }, []);

  return (
    <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
      {/* 画像表示 */}
      <div className="mb-6 w-full">
        {imageURL && (
          <Image
            className="rounded-lg"
            src={imageURL}
            // layout="responsive"
            width={800} // 画像の元のアスペクト比に応じてこれらの値を設定します
            height={400} // 画像の元のアスペクト比に応じてこれらの値を設定します
            alt="blog_image"
          />
        )}
      </div>

      <h1 className="text-4xl font-bold mb-2 text-gray-800">
        {articles && articles.Title.S}
      </h1>
      <div className="text-gray-600 mb-4">
        <h2 className="inline mr-2">筆者: {articles && articles.Author.S}</h2>
        <h2 className="inline">
          最終更新日: {articles && articles.UpdateDate.S}
        </h2>
      </div>

      {/* ここから記事表示 */}
      <div
        className="prose lg:prose-xl w-full"
        dangerouslySetInnerHTML={{ __html: htmlText }}
      ></div>
    </div>
  );
};

export default Page;
