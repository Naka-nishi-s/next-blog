import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-20 p-16 bg-slate-50">
        <Link href={"/article/1"}>
          <article className="flex flex-col gap-10">
            <Image
              src={"/img/blog/sky.png"}
              alt="sample image"
              width={100}
              height={100}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <h2>
              タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
              <br />
              <br />
              タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
              タイトルタイトルタイトルタイトル
            </h2>
          </article>
        </Link>
        <Link href={"/article/1"}>
          <article className="flex flex-col gap-10">
            <Image
              src={"/img/blog/sky.png"}
              alt="sample image"
              width={100}
              height={100}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <h2>
              タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
              <br />
              <br />
              タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
              タイトルタイトルタイトルタイトル
            </h2>
          </article>
        </Link>
      </section>

      <section className="flex gap-20 p-16 bg-slate-50">
        <article className="flex flex-col gap-10">
          <Image
            src={"/img/blog/sky.png"}
            alt="sample image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <h2>
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            <br />
            <br />
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            タイトルタイトルタイトルタイトル
          </h2>
        </article>
        <article className="flex flex-col gap-10">
          <Image
            src={"/img/blog/sky.png"}
            alt="sample image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <h2>
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            <br />
            <br />
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            タイトルタイトルタイトルタイトル
          </h2>
        </article>
      </section>

      <section className="flex gap-20 p-16 bg-slate-50">
        <article className="flex flex-col gap-10">
          <Image
            src={"/img/blog/sky.png"}
            alt="sample image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <h2>
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            <br />
            <br />
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            タイトルタイトルタイトルタイトル
          </h2>
        </article>
        <article className="flex flex-col gap-10">
          <Image
            src={"/img/blog/sky.png"}
            alt="sample image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <h2>
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            <br />
            <br />
            タイトルタイトルタイトルタイトル タイトルタイトルタイトルタイトル
            タイトルタイトルタイトルタイトル
          </h2>
        </article>
      </section>
    </div>
  );
};

export default Page;
