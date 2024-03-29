import React, { useState } from "react";
import parse from "html-react-parser";

const EmployeeModal = ({ person, open, setOpen }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`fixed z-20 inset-0 rounded-lg flex sm:p-20 md:px-40 lg:px-64 xl:px-96 bg-black bg-opacity-50 ${
        imageLoaded ? "" : "hidden"
      }`}
    >
      <img
        src={person.imageWallOfLeetUrl}
        alt={`portrait of ${person.name}`}
        className="h-full grayscale w-1/2 object-cover"
        onLoad={() => setImageLoaded(true)}
      />
      <div className="bg-gray-900 text-white sm:h-full overflow-y-scroll p-4 md:px-6">
        <span className="leading-relaxed underline-offset-4 text-left">
          {parse(person.mainText)}
        </span>
      </div>
    </button>
  );
};

export default EmployeeModal;
