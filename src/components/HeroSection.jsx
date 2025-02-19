import React from "react";

const HeroSection = ({ onReferClick }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Refer a Friend & Earn Rewards
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Share the gift of learning with your friends and earn exciting rewards
        for every successful referral!
      </p>
      <button
        onClick={onReferClick}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
      >
        Refer Now
      </button>
    </div>
  );
};

export default HeroSection;
