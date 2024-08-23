"use client";
import React, { useState } from "react";
import faqInput from "./faqData/faqInput";
import FaqsItem from "./components/FaqsItem";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function Home() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const toggleAll = () => {
    if (openIndexes.length === faqInput.length) {
      setOpenIndexes([]);
    } else {
      setOpenIndexes(faqInput.map((_, index) => index));
    }
  };

  return (
    <div className="w-full h-screen">
      <h1 className="px-5 flex justify-center py-10 flex-wrap font-bold text-slate-900">
        Frequently Asked Questions
      </h1>
      <div className="px-5 py-5 flex justify-center">
        <div className="w-[600px]">
          <div className="flex justify-end py-1">
            <button
              className={`bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded ${
                openIndexes.length === faqInput.length ? "bg-gray-400" : ""
              }`}
              onClick={toggleAll}
            >
              {openIndexes.length === faqInput.length ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
          </div>
          <div className="h-max border rounded-lg overflow-hidden">
            {faqInput.map((faqans, index) => (
              <FaqsItem
                key={index}
                open={openIndexes.includes(index)}
                toggle={() => toggle(index)}
                question={faqans.question}
                answer={faqans.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
