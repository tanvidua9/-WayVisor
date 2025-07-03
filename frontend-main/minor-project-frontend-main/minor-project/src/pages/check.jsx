import { useEffect, useState } from "react";

export default function Check() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const checkSystem = async () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${url}/system/systemcheck`);
      if (!response.ok) throw new Error("System is down");

      setStatus("up");
    } catch (error) {
      setStatus("down");
      setMessage(error.message || "Unknown error occurred");
    }
  };

  useEffect(() => {
    checkSystem();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">System Health Check</h2>
      <p className={status === "up" ? "text-green-600" : "text-red-600"}>
        {status ? (status === "up" ? "System is Running" : "System is Down") : "Checking..."}
      </p>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={checkSystem}
      >
        Recheck
      </button>
    </div>
  );
}
