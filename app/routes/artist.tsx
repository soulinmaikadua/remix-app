import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { connectToDatabase } from "~/utils/db.server";
import { User } from "~/models/User";
import type { IUser } from "~/models/User";

// Loader function to fetch data (server-side logic)
export const loader: LoaderFunction = async () => {
  await connectToDatabase();
  const users = await User.find().lean(); // Fetch users
  return json(users); // Return users as JSON
};

// Action function to handle form submissions (server-side logic)
export const action: ActionFunction = async ({ request }) => {
  await connectToDatabase();

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  await User.create({ name, email, password }); // Save user to the database
  return redirect("/users");
};

// React component to display users and form
export default function Users() {
  const users = useLoaderData<IUser[]>(); // Get users from loader

  return (
    <div>
      <h1>Users</h1>

      {/* Display list of users */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Add a New User</h2>

      {/* Form to add a new user */}
      <Form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Email: <input type="email" name="email" />
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Add User</button>
      </Form>
    </div>
  );
}
