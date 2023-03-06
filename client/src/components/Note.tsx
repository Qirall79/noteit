import React from "react";

interface Props {
  note: any;
}

const Note: React.FC<Props> = ({ note }): any => {
  return (
    <div className="w-[250px] h-[300px] bg-[#310723] py-5 px-7 rounded-md">
      <p>{note.text}</p>
    </div>
  );
};

export default Note;
