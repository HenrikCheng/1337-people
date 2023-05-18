import React, { useState } from "react";
import EmployeeModal from "./EmployeeModal";

const EmployeeList = ({ person }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      className="hover:font-bold hover:underline relative"
      key={`${person.phoneNumber}_${person.email}`}
      onClick={() => setOpen(!open)}
    >
      {open && <EmployeeModal person={person} open={open} setOpen={setOpen} />}
      {person.name}
    </button>
  );
};

export default EmployeeList;
