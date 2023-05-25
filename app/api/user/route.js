import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userData = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await userData.json();

    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return redirect("/not-found");
  }
}
