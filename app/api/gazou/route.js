import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/app/_services/awsService";

export async function GET() {
  // バケット情報
  const params = {
    Bucket: "blog-nakanishi",
    Key: "blog.png",
  };

  const command = new GetObjectCommand(params);
  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return new NextResponse(JSON.stringify({ signedURL }));
}
