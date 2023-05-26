import Link from "next/link";

export const Header = () => {
  return (
    <Link href={"/"}>
      <div className="flex flex-row w-full items-center gap-2 justify-center bg-cyan-100 drop-shadow-lg top-0">
        <div className="h-20 w-40 bg-center bg-sample bg-no-repeat bg-contain bg-cyan-100 mt-8"></div>
        <p className="text-3xl">あなたのブログ</p>
      </div>
    </Link>
  );
};
