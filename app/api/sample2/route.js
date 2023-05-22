import { NextResponse } from "next/server";

export async function GET() {
  // return new NextResponse(null, { status: 404 });
  return NextResponse.redirect("http://localhost:3000/404");
}
