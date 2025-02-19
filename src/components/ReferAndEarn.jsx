import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import BackgroundAnimation from "./BackgroundAnimation";
import BenefitsSection from "./BenefitsSection";
import HeroSection from "./HeroSection";
import ReferrerDetails from "./ReferralForm/ReferrerDetails";
import RefereeDetails from "./ReferralForm/RefereeDetails";
import CourseSelection from "./ReferralForm/CourseSelection";

const apiUrl = import.meta.env.VITE_API_URL;

const ReferAndEarn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
    refereePhone: "",
    course: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Form validation and handlers remain the same
  const validateForm = () => {
    const newErrors = {};
    if (!formData.referrerName) newErrors.referrerName = "Required";
    if (!formData.referrerEmail) {
      newErrors.referrerEmail = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.referrerEmail)) {
      newErrors.referrerEmail = "Invalid email";
    }
    if (!formData.refereeName) newErrors.refereeName = "Required";
    if (!formData.refereeEmail) {
      newErrors.refereeEmail = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.refereeEmail)) {
      newErrors.refereeEmail = "Invalid email";
    }
    if (!formData.refereePhone) {
      newErrors.refereePhone = "Required";
    } else if (!/^\d{10}$/.test(formData.refereePhone)) {
      newErrors.refereePhone = "Invalid phone number";
    }
    if (!formData.course) newErrors.course = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setApiError(null);

      // Transform the form data to match the API's expected format
      const apiData = {
        yourName: formData.referrerName,
        yourEmail: formData.referrerEmail,
        friendName: formData.refereeName,
        friendEmail: formData.refereeEmail,
        friendPhone: formData.refereePhone,
        recommendedCourse: formData.course,
      };

      try {
        const response = await fetch(`${apiUrl}/api/referrals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSubmitSuccess(true);

        // Reset form and close modal after successful submission
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(false);
          setFormData({
            referrerName: "",
            referrerEmail: "",
            refereeName: "",
            refereeEmail: "",
            refereePhone: "",
            course: "",
          });
        }, 4000);
      } catch (error) {
        console.error("Error submitting referral:", error);
        setApiError("Failed to submit referral. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <BackgroundAnimation />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative">
        <HeroSection
          onReferClick={() => {
            setIsModalOpen(true);
          }}
        />

        {/* Benefits Section */}
        <BenefitsSection />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-md mx-4 p-8 relative transform transition-all">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Refer a Friend
              </h2>
            </div>

            {submitSuccess ? (
              <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-lg p-4">
                <p className="text-green-700">
                  Referral submitted successfully! Thank you for referring a
                  friend.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Referrer Details */}
                <ReferrerDetails
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />

                {/* Friend's Details */}
                <RefereeDetails
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />

                {/* Course Selection */}
                <CourseSelection
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />

                {apiError && (
                  <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{apiError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Referral"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferAndEarn;
