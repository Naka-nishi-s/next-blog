import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

export async function GET() {
  // クライアントを作成
  const client = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: "ap-northeast-1",
  });

  // コマンド(SQL的な)を設定
  const command = new GetItemCommand({
    TableName: "Article",
    Key: {
      CategoryId: { N: "0" },
      Title: { S: "すごい技術" },
    },
  });

  // コマンドを実行(execute)
  const data = await client.send(command);

  // return data.Item;
  return NextResponse.json(data.Item);
}
