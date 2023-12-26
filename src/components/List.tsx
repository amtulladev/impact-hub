import moment from "moment";
import Link from "next/link";

interface BlogData {
  _id: string;
  title: string;
  description: string;
  urlPath?: string;
  createdAt: string;
}
export default function CustomList({ blogData }: { blogData: BlogData[] }) {
  return (
    <section className="mx-auto max-w-[1200px] px-5">
      <h1 className="mb-5 mt-20 text-4xl font-semibold md:mt-10">My blogs:</h1>
      {blogData?.map((value: BlogData, index: number) => (
        <Link
          href={`/blog/${value._id}`}
          key={index}
          passHref
          className="block flex justify-between border-b border-b-[.5px] bg-white px-5 py-4 hover:bg-gray-100"
        >
          <p>{value.title}</p>
          <p>{moment(value.createdAt).fromNow()}</p>
        </Link>
      ))}
    </section>
  );
}
