"use client";
import { Fragment } from "react";

const Page = async ({ params }) => {
  // ユーザーデータ取得
  const response = await fetch("/api/user");

  // jsonに修正
  const userData = await response.json();

  return (
    <div>
      <h1>記事一覧</h1>
      <h2>記事ID: {params.id}</h2>
      <ul>
        {userData.map((user) => (
          <Fragment key={user.id}>
            <li>{user.id}</li>
            <li>{user.title}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Page;
