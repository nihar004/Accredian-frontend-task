import React from "react";

const CourseSelection = ({ formData, errors, handleChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex">
        <div>Recommended Course*</div>
        <p className="text-red-500 text-xs ml-2">{errors.course}</p>
      </label>
      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
        className={`w-full p-1 border rounded-md ${
          errors.course ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select a course</option>
        <option value="web-development">Web Development</option>
        <option value="data-science">Data Science</option>
        <option value="mobile-development">Mobile Development</option>
        <option value="ui-ux-design">UI/UX Design</option>
      </select>
    </div>
  );
};

export default CourseSelection;
