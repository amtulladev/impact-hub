import { userAtom } from "@/atom/user";
import About from "@/components/About";
import Layout from "@/components/Layout";
import CustomList from "@/components/List";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Link from "next/link";

interface BlogData {
  _id: string;
  title: string;
  description: string;
  urlPath?: string;
  createdAt: string;
}

export default function Home() {
  const userDetails = useAtomValue(userAtom);

  const { data, isPending, isFetching, error, refetch } = useQuery({
    queryKey: ["blogData"],
    queryFn: () =>
      //@ts-ignore
      fetch(`/api/blog/get-all?userId=${userDetails.id}`).then((res) =>
        res.json(),
      ),
  });
  if (isPending) {
    return <Loader className="h-screen" />;
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
    <ProtectedRoute>
      <Layout>
        <section className="bg-secondary-bg py-5">
          {data.blogs?.length === 0 ? (
            <section className="flex min-h-[70vh] items-center justify-center">
              <Link
                href="/create"
                className="bg-secondary px-5 py-3 font-semibold text-white"
              >
                Create blog
              </Link>
            </section>
          ) : isFetching ? (
            <Loader />
          ) : (
            <Blog blogData={data.blogs} refetch={refetch} />
          )}
        </section>
        <About />
      </Layout>
    </ProtectedRoute>
  );
}

function Blog({
  blogData,
  refetch,
}: {
  blogData: BlogData[];
  refetch: Function;
}) {
  return (
    <>
      <Link
        href="/create"
        className="float-right mr-5 inline-flex items-center rounded-md bg-secondary px-5 py-3 text-xs font-semibold text-white md:mr-10 md:text-base"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#fff"
          className="mr-2 hidden md:block"
        >
          <path
            d="M6 12H12M18 12H12M12 12V6M12 12V18"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        Create blog
      </Link>
      <button
        onClick={() => {
          refetch();
        }}
        className="float-right mr-5 inline-flex items-center rounded-md bg-secondary px-5 py-3 text-xs font-semibold text-white md:mr-10 md:text-base"
      >
        <svg
          width="15px"
          height="15px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="white"
          className="mr-2 hidden md:block"
        >
          <path
            d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        Refresh
      </button>
      {Array.isArray(blogData) ? (
        blogData?.length !== 0 ? (
          <CustomList blogData={blogData} />
        ) : null
      ) : null}
    </>
  );
}
