import { ddbClient } from "../../_services/awsService";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

export async function GET() {
  // コマンド(SQL的な)を設定
  const command = new GetItemCommand({
    TableName: "Article",
    Key: {
      CategoryId: { N: "0" },
      Title: { S: "すごい技術" },
    },
  });

  // コマンドを実行(execute)
  const data = await ddbClient.send(command);

  // return data.Item;
  return NextResponse.json(data.Item);
}
