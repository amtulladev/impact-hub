export default function Footer() {
  return (
    <footer className=" bg-secondary py-6 text-white md:py-8">
      <section className="px-5 md:mx-auto  md:flex md:max-w-[1200px] md:justify-between">
        <p className="text-center md:text-left">
          © 2022 ImpactHub All Rights Reserved By ImpactHub
        </p>
        <section className="flex justify-center pt-5 md:pt-0">
          <a
            href="#"
            className="mr-8 hover:font-medium hover:text-black focus:font-medium focus:text-black"
          >
            FAQ
          </a>
          <a
            href="#"
            className="hover:font-medium hover:text-black focus:font-medium focus:text-black"
          >
            Support
          </a>
        </section>
      </section>
    </footer>
  );
}
