"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
    console.log(article);

    // サーバー側でエラーが起こった場合はerrorにエラーメッセージが入っている
    // その場合はtopにリダイレクト
    if (article.error) {
      //TODO エラーを404に渡して表示させてあげるとGood
      console.log(article.error);
      redirectToTop();
    } else {
      // 記事データを挿入
      setArticles(article);
    }
  };

  /**
   * S3から画像データを取得して表示
   */
  const setImageURLFromS3 = async () => {
    const response = await fetch("/api/gazou");
    const imageData = await response.json();

    // 画像のURLをセット
    setImageURL(imageData.signedURL);
  };

  //TODO:画像とテキストを一つのAPIで取得する

  useEffect(() => {
    setParamFromDB();
    // setImageURLFromS3();
  }, []);

  return (
    <div>
      <h1>{articles && articles.Title.S}</h1>
      <h2>記事ID: {articles && articles.ID.S}</h2>
      <h2>最終更新日: {articles && articles.UpdateDate.S}</h2>
      <h2>筆者: {articles && articles.Author.S}</h2>
      {/* 画像表示 */}
      <div>
        {imageURL && (
          <Image src={imageURL} width={100} height={100} alt="blog_image" />
        )}
      </div>
      {/* ここから記事表示 */}

      <div>
        <ul>
          <li>{articles && articles.Content.S}</li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
