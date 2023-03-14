/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { NotesContext } from "../contexts/notesContext";

interface Props {
  project: any;
}

const Notes: React.FC<Props> = ({ project }): any => {
  const notes = useContext(NotesContext);
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
    <div className=" py-20 px-10 bg-[#1b4332] text-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center">
      {project === "all" ? (
        selectedNotes.length ? (
          ""
        ) : (
          <p>No notes available. Select a project to create new notes.</p>
        )
      ) : (
        <NoteForm
          project={project}
          selectedNotes={selectedNotes}
          setSelectedNotes={setSelectedNotes}
        />
      )}
      {selectedNotes.map((note: any): any => {
        return (
          <Note
            key={note._id}
            note={note}
            selectedNotes={selectedNotes}
            setSelectedNotes={setSelectedNotes}
          />
        );
      })}
    </div>
  );
};

export default Notes;
