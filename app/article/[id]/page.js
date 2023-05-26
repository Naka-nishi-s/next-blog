"use client";

import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const getData = async () => {
    // 記事データ取得
    const articlesData = await fetch("/api/article");

    // jsonに修正
    const article = await articlesData.json();

    // 記事データを挿入
    setArticles(article);
  };

  // articleを作成
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>記事一覧</h1>
      <h2>記事ID: {params.id}</h2>
      {articles && (
        <ul>
          <li>{articles.CategoryId.N}</li>
          <li>{articles.Title.S}</li>
        </ul>
      )}
    </div>
  );
};

export default Page;
