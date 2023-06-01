import { ddbClient } from "../../_services/awsService";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  // idを取り出す
  const request = await req.json();

  const id = await request.ID;
  const title = await request.Title;

  // コマンド(SQL的な)を設定
  const command = new GetItemCommand({
    TableName: process.env.DB_TABLE_NAME,
    Key: {
      ID: { S: id },
      Title: { S: title },
    },
  });

  // 取得データを入れる
  let data;

  try {
    // コマンドを実行(execute)
    data = await ddbClient.send(command);

    // データがなかった場合はエラーを投げる
    if (data.Item === undefined) {
      throw new Error("データがないよ");
    }
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: e.message }));
  }

  // dataの中身(例)
  // Item:{
  //   Content: { S: '[{"insert":"これはとても素晴らしい。\\nすんごく素晴らしい。\\n\\nすばら。すば。\\n"}]' },
  //   Title: { S: '素晴らしい記事' },
  //   UpdateDate: { S: '2023/6/2 4:40:46' },
  //   Author: { S: '田中太郎' },
  //   ID: { S: '511d804a-5fbc-45ef-b61e-cb5548b6b5f4' }
  // }

  // NextResponseは文字列しか返せない為、文字列に変換して返す
  return new NextResponse(JSON.stringify(data.Item));
}
