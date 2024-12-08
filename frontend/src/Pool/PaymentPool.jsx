import apiUrl from "@/lib/apiUrl";
import { Loader2 } from "lucide-react";
import React from "react";

export const paymentStatusUpdate = async (checkoutRequestId) => {
  try {
    const response = await fetch(
      `${apiUrl}/student/payment-status/${checkoutRequestId}`,
      {
        credentials: "include",
      },
    );
    console.log("reponse from payment status", response);
    if (response.ok === false) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    console.log("update payment status", data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

function PaymentPool({ isVisible, onClose, paymentStatus }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {" "}
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {" "}
        <h3 className="text-xl font-bold mb-4">Payment Status</h3>{" "}
        <Loader2 size={32} />{" "}
        <div className="flex items-center space-x-4">
          {" "}
          <p className="text-green-600 font-medium">{paymentStatus}</p>{" "}
        </div>{" "}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          {" "}
          Close{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}

export default PaymentPool;
