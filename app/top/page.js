"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  // 記事を格納
  const [articles, setArticles] = useState([]);

  /**
   * DynamoDBから記事データ一覧を取得
   * @param なし
   * @returns なし
   */
  const getArticlesFromDB = async () => {
    const response = await fetch("/api/list");
    const articles = await response.json();
    setArticles(articles);
  };

  useEffect(() => {
    getArticlesFromDB();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
      {articles.map((article) => (
        <Link
          href={`/article?id=${article.ID.S}&title=${article.Title.S}`}
          key={article.ID.S}
        >
          <article className="flex flex-col gap-10">
            <Image
              src={"/img/blog/sky.png"}
              alt="sample image"
              width={100}
              height={100}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <h2>{article.Title.S}</h2>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Page;
