import Information from "@/components/Info";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("@/components/CustomEditor");
  },
  { ssr: false },
);

export default function BlogPage() {
  return (
    <>
      <Layout>
        <Information />
        <CustomEditor />
      </Layout>
    </>
  );
}
