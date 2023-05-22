import { NextResponse } from "next/server";

export async function GET() {
  return new Response("Hello, Next.js!");
}

export async function POST(request) {
  return new NextResponse(null, { status: 404 });
}
