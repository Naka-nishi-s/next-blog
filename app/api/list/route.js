import { ddbClient } from "@/app/_services/awsService";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

export async function GET() {
  // コマンドを設定
  const command = new ScanCommand({
    TableName: process.env.DB_TABLE_NAME,
    ProjectionExpression: "ID, Title",
  });

  const data = await ddbClient.send(command);
  console.log(data.Items);

  return new NextResponse(JSON.stringify(data.Items));
}
