# Impact Hub

A demo project where you can upload your blog using CKEditor. Hosted on vercel.
Stack used:

- Nextjs
- MongoDB
- TailwindCss

## Run Locally

Clone the project

```bash
  git clone https://github.com/amtulladev/impact-hub.git
```

Go to the project directory

```bash
  cd impact-hub
```

Install dependencies

```bash
  pnpm install

```

If you get any error in `CustomEditor.tsx` file on line `import Editor from "ckeditor5-custom-build";` Run the following code

```bash
pnpm install file:./ckeditor5
```

Running the application

```bash
  pnpm run dev
```

Visit http://localhost:3000 in your browser.

Running the cypress test

```bash
  pnpm run cypress:open
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

Or just duplicate `.env.sample` file

## Deployment

To Deploy this project to vercel. Remember to add this command in their Build & Development Settings -> Install Command

```bash
  cd ckeditor5 && pnpm install && cd ../ && pnpm install
```

And select override option and Deploy the application.

## Demo

Visit https://impact-hub.vercel.app to see the working demo.

To see a working example use demo account details:

- username: amtulla@gmail.com
- password: amtulla

NOTE: image uploading in ckeditor won't work in this demo.

## Packages Used

- bcrypt - used for password hashing.
- formidable - parsing form data like file uploads
- fs - file manulipation
- jotai - react state management
- react-hot-toast - to display beautiful toast notification
- sharp - compress image file

Dev-Dependency

- prettier-plugin-tailwindcss - automatically order tailwind class names
- typescript
