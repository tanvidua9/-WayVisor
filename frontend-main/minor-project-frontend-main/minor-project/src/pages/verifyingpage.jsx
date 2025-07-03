import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyingPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const verifyToken = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        navigate("/signup");
        return;
      }

      try {
        const response = await fetch(`${url}/user/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          navigate("/moodSelection");
        } else {
          setError(data.message || "Verification failed.");
          setTimeout(() => navigate("/signup"), 2000); 
        }
      } catch (error) {
        setError("Network error. Please try again.");
        setTimeout(() => navigate("/signup"), 2000);
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">
          {error ? error : "Verifying your credentials..."}
        </p>
        <p className="text-sm text-gray-600">
          {error ? "Redirecting to signup..." : "Please wait while we verify your authentication."}
        </p>
      </div>
    </div>
  );
};

export default VerifyingPage;
