import Image from "next/image";
import Link from "next/link";

export const AdSenseBar = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-6 min-w-[60px] w-5/12 pt-6 bg-cyan-100 border-2 border-slate-300 md:flex hidden">
      <div className="flex flex-col gap-6 items-center">
        <h2>ブログ運営者</h2>
        <Link href={"https://nakanishi-s.jp"}>
          <div className="px-7 py-6 rounded-full bg-white">
            <Image
              src={"/img/blog/cat.png"}
              height={60}
              width={60}
              alt="Home Image"
              className="rounded-full"
            />
          </div>
        </Link>
        <h2 className="font-bold">Nakanishi</h2>
      </div>

      <div>
        <p>ここに広告が入ります</p>
      </div>
    </div>
  );
};
