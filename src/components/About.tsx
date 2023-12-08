import FacebookIcon from "./icons/Facebook";
import HouseIcon from "./icons/House";
import LinkedInIcon from "./icons/LinkedIn";
import MailIcon from "./icons/Mail";
import PhoneIcon from "./icons/Phone";
import TwitterIcon from "./icons/Twitter";
import YoutubeIcon from "./icons/Youtube";

export default function About() {
  return (
    <section className="my-10 flex flex-col justify-evenly md:mx-auto md:max-w-[1200px] md:flex-row md:items-center">
      <section className="px-5 md:max-w-sm lg:max-w-md">
        <h2 className="text-3xl font-semibold text-secondary">ImpactHub</h2>
        <p className="pt-5 text-justify">
          At ImpactHub, we are committed to creating a positive change in our
          society by connecting volunteers, donors, and NGOs through our
          user-friendly online platform. Our mission is to simplify the process
          of finding donations and volunteering opportunities, making it easier
          for you to support various social causes close to your heart.
        </p>
        <section className="flex gap-5 pt-5">
          <a href="#">
            <FacebookIcon className="rounded-full border-[1px] border-secondary fill-secondary stroke-secondary p-1 hover:bg-secondary hover:fill-white hover:stroke-white" />
          </a>
          <a href="#">
            <TwitterIcon className="rounded-full border-[1px] border-secondary fill-secondary stroke-secondary p-1 hover:bg-secondary hover:fill-white hover:stroke-white" />
          </a>
          <a href="#">
            <YoutubeIcon className="rounded-full border-[1px] border-secondary  stroke-secondary p-1 hover:bg-secondary hover:stroke-white focus:bg-secondary focus:stroke-white" />
          </a>
          <a href="#">
            <LinkedInIcon className="rounded-full border-[1px] border-secondary fill-secondary stroke-secondary p-1 hover:bg-secondary hover:fill-white hover:stroke-white" />
          </a>
        </section>
      </section>
      <section className="mt-16 px-5 md:mt-0 md:max-w-sm lg:max-w-md">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <section className="flex flex-col gap-5 pt-5">
          <a href="#" className="flex items-center">
            <HouseIcon className="mr-3 rounded-full border-[1px] border-secondary fill-secondary stroke-secondary p-1 hover:bg-secondary hover:fill-white hover:stroke-white" />
            <p>Mumbai, Maharashtra, India - 400001</p>
          </a>
          <a href="tel:+911234567890" className="flex items-center">
            <PhoneIcon className="mr-3 rounded-full border-[1px] border-secondary fill-secondary stroke-secondary p-1 hover:bg-secondary hover:fill-white hover:stroke-white" />
            <p>+91 12345 67890</p>
          </a>
          <a href="mailto:info@impacthub.com" className="flex items-center">
            <MailIcon className="mr-3 rounded-full border-[1px] border-secondary fill-secondary stroke-secondary p-1 hover:bg-secondary hover:fill-white hover:stroke-white" />
            <p>info@impacthub.com</p>
          </a>
        </section>
      </section>
    </section>
  );
}
