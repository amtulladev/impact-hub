import Link from "next/link";
import Profile from "./icons/Profile";
import { checkLoginAtom, userAtom } from "@/atom/user";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAtom, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { RESET } from "jotai/utils";

export default function Header() {
  const [userDetails, setUserDetails] = useAtom(userAtom);

  const setLogout = useSetAtom(checkLoginAtom);
  return (
    <header className="flex items-center justify-between border-b px-5 md:mx-auto md:max-w-[1200px]">
      <Link
        href="/"
        className="px-2 py-3 text-2xl font-black text-secondary hover:bg-secondary hover:text-white md:text-4xl"
      >
        ImpactHub
      </Link>
      <section className="hidden sm:block">
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
      <Menu as="div" className="relative inline-block text-left">
        <section className="flex items-center">
          {/* @ts-ignore */}
          <p className="mr-1 md:mr-3">{userDetails.username}</p>
          <Menu.Button className="px-3 py-2 hover:bg-gray-50">
            <Profile />
          </Menu.Button>
        </section>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <button
                type="submit"
                onClick={() => {
                  setLogout(RESET);
                  setUserDetails(RESET);
                  toast.success("Logged Out Successfully");
                }}
                className="block px-4 py-2 text-sm text-gray-900"
              >
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}
