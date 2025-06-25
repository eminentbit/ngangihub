import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCampayToken } from "../../hooks/usePayment";
import { decryptData, isEncryptedResponse } from "../../utils/crypto.service";

const PaymentProcessing = () => {
  const [status, setStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelled, setCancelled] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { getToken, tokenLoading, tokenGetError } = useFetchCampayToken();
  const navigate = useNavigate();

  // Warn the user if they attempt to leave the page
  useEffect(() => {
    const handleBeforeUnload = (e: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      if (status === "pending") {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status]);

  // Poll the transaction status every 5 seconds
  useEffect(() => {
    if (cancelled || status !== "pending") return;

    const checkStatus = async () => {
      try {
        // Ensure we have a valid token/session
        await getToken();

        const reference = sessionStorage.getItem("transaction_reference");
        const transactionId = sessionStorage.getItem("transaction_id");

        if (!reference || !transactionId) {
          setErrorMessage("Missing transaction reference or ID.");
          setStatus("failed");
          return;
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_ROOT_URL}/payments/status/${reference}`,
          {
            withCredentials: true,
            params: { transactionId },
          }
        );

        // Decrypt if needed
        const payload = isEncryptedResponse(data)
          ? await decryptData(data)
          : data;
        const txStatus = payload.status.toLowerCase();

        if (
          txStatus.includes("failed") ||
          txStatus.includes("success") ||
          txStatus.includes("completed")
        ) {
          setStatus(txStatus);
          sessionStorage.removeItem("transaction_reference");
          sessionStorage.removeItem("transaction_id");
          clearInterval(intervalRef.current!);
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        setErrorMessage("Failed to check transaction status.");
        setStatus("failed");
        clearInterval(intervalRef.current!);
      }

      if (import.meta.env.DEV) console.log("Current status:", status);
    };

    // Initial check
    checkStatus();

    intervalRef.current = setInterval(checkStatus, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [cancelled, getToken, status]);

  // Navigate after success
  useEffect(() => {
    if (status === "success" || status === "completed") {
      const timer = setTimeout(() => navigate("/dashboard"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCancelled(true);
    setStatus("cancelled");
    setTimeout(() => navigate("/dashboard"), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>

      {tokenLoading && <p className="text-lg mb-6">Loading session...</p>}
      {tokenGetError && (
        <p className="text-red-600 mb-6">
          Error initializing payment. Please try again.
        </p>
      )}

      {status === "pending" && !tokenLoading && (
        <>
          <p className="text-lg mb-6">
            Please complete the transaction on your mobile device. Dial *126 if
            it doesn't appear automatically.
          </p>
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin mb-6"></div>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Cancel Transaction
          </button>
        </>
      )}

      {(status === "success" || status === "completed") && (
        <div className="flex flex-col items-center">
          <div className="text-green-500 text-8xl mb-4">✓</div>
          <p className="text-lg text-green-600 mb-6">
            Transaction completed successfully!
          </p>
          <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
        </div>
      )}

      {status === "failed" && (
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-8xl mb-4">✗</div>
          <p className="text-lg text-red-600 mb-6">
            Transaction failed. {errorMessage || "Please try again."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Return to Dashboard
          </button>
        </div>
      )}

      {status === "cancelled" && (
        <div className="flex flex-col items-center">
          <div className="text-yellow-500 text-8xl mb-4">↺</div>
          <p className="text-lg text-yellow-600 mb-6">
            Transaction cancelled. Please reject on your mobile phone to prevent
            unexpected errors.
          </p>
          <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;
