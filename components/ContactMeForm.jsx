import React, { useState, useRef } from "react";
import { sendContactForm } from "../services";

const Contact = () => {
  const [message, setMessage] = useState("");
  const formRef = useRef();

  const submitContact = async (e) => {
    e.preventDefault();
    const res = await sendContactForm({
      name: e.target[0].value,
      email: e.target[1].value,
      comment: e.target[2].value,
    });
    if (res === 0) {
      setMessage("Thank you for the message 🎏");
      formRef.current.reset();
    } else {
      setMessage("Something went wrong 😿");
    }
  };

  

  return (
    <div className="flex flex-col select-none items-center">
      <h1 className="text-stone-100 italic text-[1.5rem] font-bold leading-[1.4] mb-2 w-fit">✉️ Send me a quick message 🚀</h1>
      {message.length > 0 && (
        <div
          id="message"
          className="w-72 text-base hover:scale-105 duration-300 text-stone-800 bg-stone-200 rounded-lg px-2 mb-3 flex justify-between"
        >
          {message}
          <span
            onClick={() => setMessage("")}
            className="ml-2 text-red-500 cursor-pointer "
          >
            &times;
          </span>
        </div>
      )}
      <div className="w-72 text-base text-stone-100">
        <form ref={formRef} onSubmit={submitContact}>
          <input
            required
            placeholder="name*"
            type="text"
            minLength={3}
            maxLength={25}
            className="backdrop-blur w-full px-2 mb-3 focus:outline-0 bg-transparent border-b-2 placeholder:text-stone-100 bg-transparent rounded "
          />
          <input
            required
            placeholder="email addy*"
            type="email"
            className="backdrop-blur w-full px-2 mb-3 focus:outline-0 bg-transparent border-b-2 placeholder:text-stone-100 bg-transparent rounded"
          />
          <textarea
            required
            placeholder="heyyy"
            rows={3} 
            className="backdrop-blur w-full px-2 my-3 placeholder:text-stone-100 focus:border-stone-100 focus:placeholder:animate-pulse placeholder:invisible focus:placeholder:visible focus:outline-0 bg-transparent border-[2px] rounded-md"
          ></textarea>
          <button
            type="submit"
            className="bg-sky-400 ease-out text-stone-100 px-2 py-1 rounded hover:bg-emerald-400 hover:scale-110 duration-300"
          >
            send 📤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
