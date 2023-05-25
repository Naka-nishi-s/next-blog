import { redirect } from "next/navigation";

export default function Home() {
  // Topページへ飛ばす
  // 必要ならここでログインチェック
  redirect("/top");
}
