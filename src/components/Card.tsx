import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";
import TwitterIcon from "./icons/Twitter";

interface BlogData {
  title: string;
  description: string;
}
export default function CustomCard({ blogData }: { blogData: BlogData[] }) {
  return (
    <section>
      {blogData?.map((value: BlogData, index: number) => (
        <section
          key={index}
          className="mx-auto mb-10 max-w-2xl bg-white px-10 py-5"
        >
          <h2 className="text-2xl font-semibold">{value.title}</h2>
          <img src="#" alt="image here" width={300} height={300} />
          <p
            className="my-6"
            dangerouslySetInnerHTML={{ __html: value.description || "" }}
          />
          <a
            href="#"
            className="mr-6 inline-block border border-transparent bg-secondary px-10 py-3 font-semibold text-white hover:border-secondary hover:bg-white hover:text-secondary  focus:border-secondary focus:bg-white focus:text-secondary"
          >
            Donate
          </a>
          <a
            href="#"
            className="inline-block border border-secondary px-10 py-3 font-semibold text-secondary hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white"
          >
            Share
          </a>
          <section className="my-5 border-b"></section>
          <h2 className="mb-3 text-2xl">Share this Fundraiser:</h2>
          <section className="my-6 flex justify-between">
            <a
              href="#"
              className="inline-flex rounded-md border border-transparent bg-[#3B5998] px-6 py-3 font-semibold text-white"
            >
              <FacebookIcon className="h-6 w-6 fill-white" />
              Facebook
            </a>
            <a
              href="#"
              className="inline-flex gap-3 rounded-md border border-transparent bg-[#56ACEF] px-6 py-3 font-semibold text-white"
            >
              <TwitterIcon className="h-6 w-6 fill-white" />
              Twitter
            </a>
            <a
              href="#"
              className="inline-flex gap-2 rounded-md border border-transparent bg-[#D82467] px-6 py-3 font-semibold text-white"
            >
              <InstagramIcon className="h-6 w-6 stroke-white" />
              Instagram
            </a>
          </section>
        </section>
      ))}
    </section>
  );
}
