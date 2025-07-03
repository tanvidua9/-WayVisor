import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you are looking for doesn't exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
}
