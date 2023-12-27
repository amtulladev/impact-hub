import Loader from "@/components/Loader";
import FacebookIcon from "@/components/icons/Facebook";
import InstagramIcon from "@/components/icons/Instagram";
import TwitterIcon from "@/components/icons/Twitter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogPage() {
  const router = useRouter();

  const id = router.query.blogId;

  const { data, isFetching, isPending, error } = useQuery({
    queryKey: ["blogData"],
    queryFn: () =>
      //@ts-ignore
      fetch(`/api/blog/get?blogId=${id}`).then((res) => res.json()),
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <h1 className="text-center">Some error occurred</h1>
        <p className="text-center">{error.message}</p>
      </>
    );
  }

  return (
    <section className="min-h-screen bg-gray-200 pb-10">
      <Link
        href="/"
        className="ml-3 mt-10 inline-flex items-center rounded-lg border-[1px] bg-white px-10 py-3 hover:border-black"
      >
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          className="mr-1"
        >
          <path
            d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        Back
      </Link>
      {isFetching ? (
        "Loading...."
      ) : Object.keys(data.blogs).length !== 0 ? (
        <section className="mx-5 mx-auto mt-20 max-w-[850px] bg-white px-5 py-10 shadow-md md:px-10">
          <h2 className="text-2xl font-semibold">{data.blogs.title}</h2>
          {data.blogs.urlPath ? (
            <Image
              src={data.blogs.urlPath}
              alt="Blog Header Image"
              width={450}
              height={300}
              className="mx-auto mt-10"
            />
          ) : null}

          <p
            className="my-6"
            dangerouslySetInnerHTML={{
              __html:
                data.blogs?.description?.replace(
                  /<figure class="image">[^]*<\/figure>/gs,
                  "",
                ) || "",
            }}
          />
          <section className="mt-20 flex flex-col space-y-5 md:flex-row md:justify-start md:space-x-10 md:space-y-0">
            <a
              href="#"
              className="border border-transparent bg-secondary px-10 py-3 text-center font-semibold text-white hover:border-secondary hover:bg-white hover:text-secondary focus:border-secondary focus:bg-white focus:text-secondary"
            >
              Donate
            </a>
            <a
              href="#"
              className="border border-secondary px-10 py-3 text-center font-semibold text-secondary hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white"
            >
              Share
            </a>
          </section>
          <section className="my-5 border-b"></section>
          <h2 className="mb-3 text-2xl">Share this Fundraiser:</h2>
          <section className="flex flex-col flex-wrap justify-evenly space-y-5 py-6 md:flex-row md:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center rounded-md border border-transparent bg-[#3B5998] px-4 py-3 font-semibold text-white"
            >
              <FacebookIcon className="h-6 w-6 fill-white" />
              Facebook
            </a>
            <a
              href="#"
              className="inline-flex justify-center gap-3 rounded-md border border-transparent bg-[#56ACEF] px-4 py-3 font-semibold text-white"
            >
              <TwitterIcon className="h-6 w-6 fill-white" />
              Twitter
            </a>
            <a
              href="#"
              className="inline-flex justify-center gap-2 rounded-md border border-transparent bg-[#D82467] px-4 py-3 font-semibold text-white"
            >
              <InstagramIcon className="h-6 w-6 stroke-white" />
              Instagram
            </a>
          </section>
        </section>
      ) : null}
    </section>
  );
}
