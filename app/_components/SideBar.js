import Image from "next/image";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-6 w-1/12 pt-6 bg-cyan-100 border-2 border-slate-300">
      <Link href={"/"}>
        <Image
          src={"/img/sidebar/home.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
      <Link href={"/mypage"}>
        <Image
          src={"/img/sidebar/human.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
      <Link href={"/search"}>
        <Image
          src={"/img/sidebar/search.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
      <Link href={"/goods"}>
        <Image
          src={"/img/sidebar/good.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
    </div>
  );
};
