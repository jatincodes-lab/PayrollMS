import React from "react";

const SummaryCard = ({ icon, text, number }) => {
  const isCurrency =
    typeof number === "number" && text.toLowerCase().includes("pay");

  return (
    <div className="flex items-center bg-[#1F1C2C] text-[#928DAB] p-4 rounded-lg shadow-md w-full">
      {/* Icon section */}
      <div className="text-3xl mr-4 text-[#928DAB]">{icon}</div>

      {/* Text + number */}
      <div className="flex flex-col">
        <p className="text-sm font-medium">{text}</p>
        <p className="text-xl font-bold text-white">
          {isCurrency
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(number)
            : number}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
