import apiUrl from "@/lib/apiUrl";
import React from "react";

export const paymentStatusUpdate = async (checkoutRequestID) => {
  try {
    const response = await fetch(
      `${apiUrl}/student/payment-status/${checkoutRequestID}`,
      {
        credentials: "include",
      },
    );
    console.log("response from payment status", response);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unknown error occurred");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error while updating payment status", error);
    return { success: false, message: error.message };
  }
};

function PaymentPool({ isVisible, paymentStatus }) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm mx-auto">
        <h3 className="text-xl font-bold mb-4 text-center">Payment Status</h3>
        <div className="flex justify-center items-center mb-4">
          {/* Progress Spinner */}
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-300 w-10 h-10 border-t-blue-500"></div>
        </div>
        <div className="flex justify-center mb-4">
          <p className="text-xl text-green-500 font-medium">{paymentStatus}</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPool;
