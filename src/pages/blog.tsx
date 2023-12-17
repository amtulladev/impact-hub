import Information from "@/components/Info";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
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
      <ProtectedRoute>
        <Layout>
          <Information />
          <CustomEditor />
        </Layout>
      </ProtectedRoute>
    </>
  );
}
