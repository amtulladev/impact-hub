import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { FormEvent, useState } from "react";
import Loader from "./Loader";
import { useAtomValue } from "jotai";
import { user } from "@/atom/user";
import { useRouter } from "next/navigation";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

function CustomEditor() {
  const [title, setTitle] = useState<string>("");
  const userDetails = useAtomValue(user);
  const [description, setDescription] = useState<string>(
    "<h1>Write your blog post here</h1>",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("entereed");

    try {
      setIsLoading(true);
      const formData = {
        title,
        description,
        userId: userDetails.id,
      };
      const response = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseMessage = await response.json();
      if (response.ok) {
        console.log("fetch passed");

        setTitle("");
        setDescription("");
        setIsLoading(false);
        router.push("/");
      } else {
        console.log("fetch failed");

        alert(JSON.stringify(responseMessage.error));
      }
    } catch (error) {
      console.error("Error during post request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-100 py-10">
      <form className="px-3 md:mx-auto md:max-w-4xl" onSubmit={handleSubmit}>
        <section>
          <label htmlFor="title" className="mb-2 block font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
            className="block w-9/12 border border-gray-300 p-2.5 sm:text-sm"
            placeholder="Title for your blog post"
            required
          />
        </section>
        <section>
          <label
            htmlFor="description"
            className="mb-2 mt-10 block font-semibold"
          >
            Description
          </label>
          <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={description}
            onChange={(_event, editor) => {
              const data = editor.getData();
              setDescription(data);
              console.log("taking data");
            }}
          />
        </section>
        <button
          type="submit"
          className="mt-10 bg-secondary px-5 py-3 font-semibold text-white"
        >
          Create
        </button>
      </form>
    </section>
  );
}

export default CustomEditor;
