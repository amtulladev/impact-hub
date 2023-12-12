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
          <CustomEditor initialData="<h1>Hello from CKEditor in Next.js!</h1>" />
        </Layout>
      </ProtectedRoute>
    </>
  );
}
