import React, { useState, useEffect } from "react";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { connectToDatabase } from "~/utils/db.server";
import { Song } from "~/models/Song";
// eslint-disable-next-line import/no-unresolved
// Lazy load the RichTextEditor only in the browser
const RichTextEditor = React.lazy(() => import("~/components/RichTextEditor"));

// Action function to handle form submissions (server-side logic)
export const action: ActionFunction = async ({ request }) => {
  await connectToDatabase();

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const writer = formData.get("write") as string;
  const singer = formData.get("singer") as string;
  const genre = formData.get("genre") as string;
  const posted_by = formData.get("posted_by") as string;
  const content = formData.get("content") as string;

  if (!title || writer || singer || genre || posted_by || content) {
    throw new Error("All fields are required");
  }

  await Song.create({ title, writer, singer, genre, posted_by }); // Save user to the database
  return redirect("/write");
};

// React component to display users and form
export default function Write() {
  const [content, setContent] = useState("");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="max-w-xl mx-auto">
      <h1>Users</h1>

      <h2>Add a New User</h2>

      {/* Form to add a new user */}
      <Form method="post">
        <div>
          <label htmlFor="title">Song title:</label>
          <input type="text" name="title" className="form-input" />
        </div>
        <div>
          <label htmlFor="singer">Singer:</label>
          <input type="text" name="singer" className="form-input" />
        </div>
        <div>
          <label htmlFor="writer">Writer:</label>
          <input type="text" name="writer" className="form-input" />
        </div>
        <div>
          <label htmlFor="singer">Singer:</label>
          <input type="text" name="singer" className="form-input" />
        </div>
        {/* {isClient}
        <RichTextEditor value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} /> */}
        {isClient ? (
          <React.Suspense fallback={<div>Loading editor...</div>}>
            <RichTextEditor value={content} onChange={setContent} />
          </React.Suspense>
        ) : (
          <div>Loading...</div>
        )}
        <button type="submit">Add User</button>
      </Form>
    </div>
  );
}
