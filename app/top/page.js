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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
      {articles.map((article) => (
        <Link
          href={`/article?id=${article.ID.S}&title=${article.Title.S}`}
          key={article.ID.S}
        >
          <article className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-200 ease-in-out">
            <div className="relative h-48">
              <Image
                src={"/img/blog/sky.png"}
                alt="sample image"
                fill
                cover="true"
              />
            </div>
            <h2 className="font-bold text-xl p-4 hover:text-blue-600">
              {article.Title.S}
            </h2>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Page;
