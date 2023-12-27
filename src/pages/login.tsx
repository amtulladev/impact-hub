import { checkLoginAtom, userAtom } from "@/atom/user";
import Loader from "@/components/Loader";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const setIsLoggedIn = useSetAtom(checkLoginAtom);
  const setUserDetails = useSetAtom(userAtom);
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseMessage = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        setFormData({
          email: "",
          password: "",
        });
        router.push("/");
        setUserDetails({
          id: responseMessage._id,
          username: responseMessage.username,
        });
        setIsLoading(false);
        toast.success("Logged In Successfully");
      } else {
        toast.error(responseMessage.error);
      }
    } catch (error) {
      toast.error(`Error during post request:" ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  return (
    <section>
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <Link
          href="/"
          className="mb-6 flex items-center text-2xl font-semibold text-secondary"
        >
          ImpactHub
        </Link>
        <div className="w-full rounded-lg bg-slate-100 shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  data-emailId="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 sm:text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  data-passwordId="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg border px-5 py-2.5 text-center text-sm font-medium hover:border-gray-300 hover:font-semibold"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-900">
                Don’t have an account yet?{" "}
                <Link href="/signup" className="font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
