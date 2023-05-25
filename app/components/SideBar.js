import Image from "next/image";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-6 w-1/12 pt-6 h-full bg-cyan-100">
      <Link href={"/"}>
        <Image
          src={"/img/home.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
      <Link href={"/pages/mypage"}>
        <Image
          src={"/img/human.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
      <Link href={"/pages/search"}>
        <Image
          src={"/img/search.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
      <Link href={"/pages/goods"}>
        <Image
          src={"/img/good.png"}
          height={60}
          width={60}
          alt="Good Image"
          className="p-2"
        />
      </Link>
    </div>
  );
};
