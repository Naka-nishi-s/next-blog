import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.redirect("http://localhost:3000/pages/sample");
}
