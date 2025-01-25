import LoginForm from "@/app/login/LoginForm";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">
          Login
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
