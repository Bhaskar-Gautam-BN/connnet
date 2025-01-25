"use client";

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", // This allows the cookie to be set across origins
        body: JSON.stringify({ email, password }),
      });
      console.log("🚀 ~ onSubmitHandler ~ response:", response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        // document.cookie =`user-details=${}; path=/`
        document.cookie = `login-token=${data.token}; path=/;`;
        document.cookie = `user=${JSON.stringify(data.user)}; path=/;`;
        router.replace("/");
        // Cookies.set("login-token", data.token);
        // router.replace("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username or email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="*********"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          onClick={() => {}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
