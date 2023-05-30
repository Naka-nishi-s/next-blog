"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  // 画像情報
  const [imageURL, setImageURL] = useState("");
  // 記事情報
  const [articles, setArticles] = useState(null);

  /**
   * DynamoDBから文章データを取得して表示
   * @param なし
   * @return なし
   */
  const setParamFromDB = async () => {
    // 記事データ取得
    const articlesData = await fetch("/api/article");

    // jsonに修正
    const article = await articlesData.json();

    // 記事データを挿入
    setArticles(article);
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
    setImageURLFromS3();
  }, []);

  return (
    <div>
      <h1>記事一覧</h1>
      <h2>記事ID: {params.id}</h2>
      {/* 画像表示 */}
      <div>
        {imageURL && (
          <Image src={imageURL} width={100} height={100} alt="blog_image" />
        )}
      </div>
      {/* ここから記事表示 */}
      {articles && (
        <div>
          <ul>
            <li>{articles.CategoryId.N}</li>
            <li>{articles.Title.S}</li>
            <li>{articles.Title.S}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
