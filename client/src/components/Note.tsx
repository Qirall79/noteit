import React from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

interface Props {
  note: any;
}

const Note: React.FC<Props> = ({ note }): any => {
  return (
    <div className="w-[250px] h-[300px] bg-[#081c15] py-5 px-7 rounded-md">
      <div className="flex justify-between items-center mb-4 pb-2 border-b-[.2px] border-[#71bb9a8e] ">
        <h3 className="capitalize text-lg font-semibold text-[#50b688]">
          {note.title ? note.title : "title"}
        </h3>
        <div className="flex gap-4 text-sm">
          <AiTwotoneEdit className="text-lg text-[#40916c] hover:text-[#1B4332] cursor-pointer transition-all" />
          <AiFillDelete className="text-lg text-[#40916c] hover:text-[#1B4332] cursor-pointer transition-all" />
        </div>
      </div>
      <div id="content" className="text-sm">
        <p>{note.text}</p>
      </div>
    </div>
  );
};

export default Note;
