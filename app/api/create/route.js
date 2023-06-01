import { ddbClient } from "@/app/_services/awsService";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

export async function POST(req, res) {
  // リクエストを取得し、jsonに変換
  const request = await req.json();

  //TODO 内容を全取得 → 画像名も控える
  // 画像をS3へ = 同期でDynamoにデータ格納

  // リクエスト内容(例)
  // {
  //   title: 'sssssssss',
  //   author: 'dddddd',
  //   content: [ { insert: 'aaaaaaaa\n' } ],
  //   updateDate: '2023/6/2 1:52:46'
  // }

  const id = await uuidV4();

  const command = new PutItemCommand({
    TableName: process.env.DB_TABLE_NAME,
    Item: {
      ID: { S: id },
      Title: { S: request.title },
      Author: { S: request.author },
      Content: { S: JSON.stringify(request.content) },
      UpdateDate: { S: request.updateDate },
    },
  });

  try {
    // データを挿入する
    await ddbClient.send(command);
  } catch (e) {
    console.log(e);
    // エラーメッセージ
    let errMessage = "";
    let statusCode = 500;

    // Key情報などの接続情報が誤っている場合
    if (e.name === "ValidationException") {
      errMessage = "DynamoDBとの接続情報が間違っています";
      statusCode = 400;
    }

    // 不明なエラーの場合
    if (!errMessage) {
      errMessage = "DB接続時にエラーが発生しました。";
    }
    console.log("エラーです。");
    // エラーをフロントに返す
    return new NextResponse(JSON.stringify({ error: errMessage }), {
      status: statusCode,
    });
  }

  return new NextResponse(null, { status: 204 });
}
