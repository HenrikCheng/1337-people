import React from "react";
import parse from "html-react-parser";

const EmployeeModal = ({ person, open, setOpen }) => {
  const htmlString = person.mainText;
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="fixed z-10 inset-0 rounded-lg flex p-20"
    >
      <img
        src={person.imageWallOfLeetUrl}
        alt={`portrait of ${person.name}`}
        className="h-full grayscale object-cover"
      />
      <div className="bg-gray-900 text-white h-full overflow-y-scroll p-4">
        <span className="leading-relaxed underline-offset-4">
          {parse(htmlString)}
        </span>
      </div>
    </button>
  );
};

export default EmployeeModal;
