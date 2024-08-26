'use client'
import React, { useState } from "react";
import faqInput from '../faqData/faqInput';
import FaqsItem from './_components/FaqsItem';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const faq = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [toggleInd, setToggleInd] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const findWords = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
  };

  const highlightSearch = (faqText) => {
    if (!inputVal) 
      return faqText;
      const splitSearch = new RegExp(`(${inputVal})`, 'gi');
      return faqText.split(splitSearch).map((splitted, index) =>
        splitted.toLowerCase() === inputVal.toLowerCase()?(<span key={index} className="bg-blue-200">{splitted}</span>):(splitted)
      
    );
  };

  const toggle = (index) => {
    if (toggleInd === true) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else if (toggleInd && openIndexes.length > 0) {
        setOpen(index);
        setOpenIndexes([]);
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      if (index === open) {
        setOpen(null);
      } else {
        setOpen(index);
      }
    }
  };

  const toggleAll = () => {
    if (openIndexes.length === faqInput.length) {
      setToggleInd(false);
      setOpenIndexes([]);
    } else {
      setToggleInd(true);
      setOpenIndexes(faqInput.map((_, index) => _.id));
    }
  };

  return (
    <div className="w-full h-screen">
      <h1 className="px-5 flex justify-center py-10 flex-wrap font-bold text-slate-900">
        Frequently Asked Questions
      </h1>
      <div className="flex items-center justify-center cursor-pointer">
        <div className="relative w-60">
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-full box-border border border-gray-200 focus:shadow-md transition-all duration-300 delay-150" 
            placeholder="Search..." 
            value={inputVal} 
            onChange={findWords}
          />
          <button className="absolute right-0 top-0 mt-1 mr-2 bg-gray-500 text-white p-2 rounded-full focus:outline-none">
            <FaArrowRight />
          </button>
        </div>
      </div>
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
          <div className="h-max border rounded-lg overflow-hidden hover:cursor-pointer">
            {faqInput.map((faqans, index) => (
              <FaqsItem
                key={index}
                openAll={openIndexes.includes(faqans.id)}
                open={open === faqans.id}
                toggle={() => toggle(faqans.id)}
                question={highlightSearch(faqans.question)}
                answer={faqans.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default faq;
