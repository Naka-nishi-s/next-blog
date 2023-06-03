import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/app/_services/awsService";

export async function POST(req, res) {
  // 画像名を取得
  const { fileName } = await req.json();

  // 接続するバケット情報
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  };

  // バケット情報からデータを取得するコマンドを発行
  const command = new GetObjectCommand(params);

  // 一時的にS3の該当画像にアクセスできるURLを発行する
  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  // 発行したURLをフロントに返す
  return new NextResponse(signedURL);
}
