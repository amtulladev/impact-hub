import { userAtom } from "@/atom/user";
import About from "@/components/About";
import CustomCard from "@/components/Card";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BlogData {
  title: string;
  description: string;
}

export default function Home() {
  const userDetails = useAtomValue(userAtom);
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function FetchBlogs() {
    try {
      setIsLoading(true);

      const data = {
        // @ts-ignore
        userId: userDetails.id,
      };

      const response = await fetch("/api/blog/get-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseMessage = await response.json();
      if (response.ok) {
        setBlogData(responseMessage?.blogs);
        setIsLoading(false);
      } else {
        toast.error(responseMessage.error);
      }
    } catch (error) {
      toast.error(`Error during post request: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    FetchBlogs();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <Layout>
        <section className="bg-secondary-bg py-5">
          {blogData?.length === 0 ? (
            <section className="flex min-h-[70vh] items-center justify-center">
              <Link
                href="/blog"
                className="bg-secondary px-5 py-3 font-semibold text-white"
              >
                Create blog
              </Link>
            </section>
          ) : (
            <Blog blogData={blogData} />
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
        href="/blog"
        className="float-right mr-10 bg-secondary px-5 py-3 font-semibold text-white"
      >
        Create blog
      </Link>
      {blogData?.length !== 0 ? <CustomCard blogData={blogData} /> : null}
    </>
  );
}
