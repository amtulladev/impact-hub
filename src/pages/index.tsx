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

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogData"],
    queryFn: () =>
      //@ts-ignore
      fetch(`/api/blog/get-all?userId=${userDetails.id}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) {
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
          ) : (
            <Blog blogData={data.blogs} />
          )}
        </section>
        <About />
      </Layout>
    </ProtectedRoute>
  );
}

function Blog({ blogData }: { blogData: BlogData[] }) {
  return (
    <>
      <Link
        href="/create"
        className="float-right mr-5 bg-secondary px-5 py-3 font-semibold text-white md:mr-10"
      >
        Create blog
      </Link>
      {Array.isArray(blogData) ? (
        blogData?.length !== 0 ? (
          <CustomList blogData={blogData} />
        ) : null
      ) : null}
    </>
  );
}
