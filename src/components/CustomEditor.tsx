import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { FormEvent, useState } from "react";
import Loader from "./Loader";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atom/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function CustomEditor() {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const userDetails = useAtomValue(userAtom);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (description !== "") {
      try {
        setIsLoading(true);
        const formData = {
          title: title.trim(),
          description: description.trim(),
          urlPath: image,
          //@ts-ignore
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
          toast.success("Data Saved Successfully");
          setTitle("");
          setDescription("");
          setIsLoading(false);
          router.push("/");
        } else {
          toast.error(responseMessage.error);
        }
      } catch (error) {
        toast.error(`Error during post request: ${error}`);
      } finally {
        setIsLoading(false);
      }
    } else toast.error("Description Cannot Be Empty");
  };

  if (isLoading) {
    return <Loader />;
  }

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
    extraPlugins: [uploadPlugin],
  };

  function uploadAdapter(loader: any) {
    return {
      async upload() {
        try {
          const file = await loader.file;

          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/blog/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          if (data.success) {
            const uploadedUrl = data.url;
            setImage(uploadedUrl);
            return { default: uploadedUrl };
          } else {
            throw new Error(data.error || "Error uploading file");
          }
        } catch (error) {
          toast.error(`Error uploading file: ${error}`);
          throw error;
        }
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any,
    ) => {
      return uploadAdapter(loader);
    };
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
            data-titleId="title"
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
            data-descriptionId="description"
            editor={Editor}
            config={editorConfiguration}
            data={description}
            onChange={(_event, editor) => {
              const data = editor.getData();
              setDescription(data);
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
