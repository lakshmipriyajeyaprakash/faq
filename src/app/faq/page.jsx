'use client'
import React, { useState } from "react";
import faqInput from '../faqData/faqInput';
import FaqsItem from './_components/FaqsItem';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const faq = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openIndexes, setOpenIndexes] = useState([]);
  const [toggleInd, setToggleInd] = useState(false);
  const [open, setOpen] = useState(null);
  const [inputVal, setInputVal] = useState(!!searchParams.get("search") ? searchParams.get("search") : '');
  
  const findWords = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/faq?search=${inputVal}`);
  }

  const toggle = (index) => {
    if (toggleInd) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([index]);
      }
    } else {
      setOpen(open === index ? null : index);
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

  // FAQs Filter based on the search input
  const filteredFaqs = faqInput.filter(faqans =>
    faqans.question.toLowerCase().includes(inputVal.toLowerCase())
  );

  // Display FAQ
  const faqsToDisplay = filteredFaqs.length > 0 ? filteredFaqs : faqInput;

  return (
    <div className="w-full h-screen">
      <h1 className="px-5 flex justify-center py-10 flex-wrap text-slate-900 font-extrabold">
        Frequently Asked Questions
      </h1>
      <div className="flex items-center justify-center cursor-pointer">
        <div className="relative w-60">
          <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-full box-border border border-gray-200 focus:shadow-md transition-all duration-300 delay-150" 
            placeholder="Search..." 
            value={inputVal} 
            onChange={findWords}
          />
          <button type='submit' className="absolute right-0 top-0 mt-1 mr-2 bg-gray-500 text-white p-2 rounded-full focus:outline-none">
            <FaArrowRight />
            </button>
            </form>
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
          <div className="h-max border rounded-lg overflow-hidden ">
            {faqsToDisplay.map((faqans, index) => (
              <div key={index} className="border-b last:border-b-0">
              <div
                className={`px-5 py-4 flex items-center justify-between hover:cursor-pointer ${
                  open === faqans.id || openIndexes.includes(faqans.id) ? "bg-gray-100 shadow-md" : ""
                }`}
                onClick={() => toggle(faqans.id)}
              >
                <p className="flex-1">{faqans.question}</p>
                <span>{open === faqans.id || openIndexes.includes(faqans.id) ? <FaChevronUp /> : <FaChevronDown />}</span>
              </div>
              <div className="px-5 flex items-center justify-between">
                {open === faqans.id || openIndexes.includes(faqans.id) ? (
                  <div className="">
                    <p className="flex-1 py-4 ">{faqans.answer}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default faq;
