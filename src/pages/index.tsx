import About from "@/components/About";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <About />
      </Layout>
    </ProtectedRoute>
  );
}
