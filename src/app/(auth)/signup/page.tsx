"use client";

import React, { useState } from "react";

const signUpPage = () => {
  const [error, serError] = useState("");
  return (
    <div className="max-h-screen border-2 bg-gray-50 flex justify-center items-center ">
      <div className="border-gray-200 shadow-2xl rounded-2xl w-full max-w-md mx-auto border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 text-sm mt-2">
            Start chatting with AI today
          </p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}
        {/* Form */}
        <form >
            <div>
                <label>
                    Name
                </label>
                <input type="text" />
            </div>
        </form>
      </div>
    </div>
  );
};

export default signUpPage;
