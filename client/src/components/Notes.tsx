/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Note from "./Note";

interface Props {
  project: any;
  notes: any;
}

const Notes: React.FC<Props> = ({ project, notes }): any => {
  const [selectedNotes, setSelectedNotes] = useState([]);

  const filterNotes = (project: string): any => {
    if (project === "all") {
      setSelectedNotes(notes);
      return;
    }
    const selected = notes.filter((note: any) => note.project._id === project);
    setSelectedNotes(selected);
  };

  useEffect(() => {
    filterNotes(project);
  }, [project]);

  return (
    <div className=" py-20 px-10 bg-[#4C0033] text-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center">
      {!selectedNotes.length
        ? "There are no notes for this project."
        : selectedNotes.map((note: any): any => {
            return <Note note={note} />;
          })}
    </div>
  );
};

export default Notes;
