import Link from "next/link";

export default function Page404() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="px-4 py-8 lg:px-6 lg:py-16">
        <div className="text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-secondary lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-800">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg border px-5 py-2.5 text-center text-sm font-medium"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
