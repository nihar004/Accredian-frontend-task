import React from "react";

const RefereeDetails = ({ formData, errors, handleChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Friend's Details</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex">
            <div>Friend's Name*</div>
            <p className="text-red-500 text-xs ml-2">{errors.refereeName}</p>
          </label>
          <input
            type="text"
            name="refereeName"
            value={formData.refereeName}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${
              errors.refereeName ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex">
            <div>Friend's Email*</div>
            <p className="text-red-500 text-xs ml-2">{errors.refereeEmail}</p>
          </label>
          <input
            type="email"
            name="refereeEmail"
            value={formData.refereeEmail}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${
              errors.refereeEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex">
            <div>Friend's Phone*</div>
            <p className="text-red-500 text-xs ml-2">{errors.refereePhone}</p>
          </label>
          <input
            type="tel"
            name="refereePhone"
            value={formData.refereePhone}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${
              errors.refereePhone ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default RefereeDetails;
