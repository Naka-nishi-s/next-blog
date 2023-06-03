import { s3Client } from "@/app/_services/awsService";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { fileName } = await req.json();

  // データ取得用のコマンドを発行
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });

  // プリサインURLを発行する
  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return new NextResponse(signedURL);
}
