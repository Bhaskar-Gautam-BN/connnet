"use client";

import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleLogOut = () => {
    // Clear cookies
    document.cookie = `login-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    router.push("/");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogOut}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Log-out
      </button>
    </div>
  );
};

export default page;
