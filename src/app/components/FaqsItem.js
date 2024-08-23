import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
const FaqsItem = ({ toggle, open, question, answer }) => {
  return (
    <div className="border-b last:border-b-0">
      <div
        className={`px-5 py-4 flex items-center justify-between ${
          open ? "bg-gray-100 shadow-md" : ""
        }`}
        onClick={toggle}
      >
        <p className="flex-1">{question}</p>
        <span>{open ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      <div className="px-5 flex items-center justify-between">
        {open && (
          <div className="">
            <p className="flex-1 py-4">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqsItem;
