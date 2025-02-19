import React from "react";

const ReferrerDetails = ({ formData, errors, handleChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Your Details</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex">
            <div>Your Name*</div>
            <p className="text-red-500 text-xs ml-2">{errors.referrerName}</p>
          </label>
          <input
            type="text"
            name="referrerName"
            value={formData.referrerName}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${
              errors.referrerName ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex">
            <div>Your Email*</div>
            <p className="text-red-500 text-xs ml-2">{errors.referrerEmail}</p>
          </label>
          <input
            type="email"
            name="referrerEmail"
            value={formData.referrerEmail}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${
              errors.referrerEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferrerDetails;
