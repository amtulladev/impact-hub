import Profile from "./icons/Profile";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b px-2 md:mx-auto md:max-w-[1200px] md:px-0">
      <p className="px-2 py-3 text-2xl font-black text-secondary hover:bg-secondary hover:text-white md:text-4xl">
        ImpactHub
      </p>
      <section>
        <a href="#" className="mr-3 hover:font-semibold focus:font-semibold">
          Home
        </a>
        <a href="#" className="mr-3 hover:font-semibold focus:font-semibold">
          Discover
        </a>
        <a href="#" className="hover:font-semibold focus:font-semibold">
          About
        </a>
      </section>
      <section className="flex items-center">
        <p className="mr-1 md:mr-3">Name here</p>
        <Profile />
      </section>
    </header>
  );
}
