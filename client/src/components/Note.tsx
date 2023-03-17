import React, { useContext, useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { NotesDispatchContext } from "../contexts/notesContext";
import deleteNote from "../utils/deleteNote";
import ConfirmationForm from "./ConfirmationForm";
import NoteUpdateForm from "./NoteUpdateForm";

interface Props {
  note: any;
  selectedNotes: any;
  setSelectedNotes: any;
}

const Note: React.FC<Props> = ({
  note,
  selectedNotes,
  setSelectedNotes,
}): any => {
  // get notes dispatch function
  const notesDispatch = useContext(NotesDispatchContext);

  // put note on state to change UI it on update
  const [currentNote, setNote] = useState(note);

  // edit mode
  const [editMode, setEditMode] = useState(false);

  // control confirmation form
  const [showConfirm, setShowConfirm] = useState(false);

  // delete event handler
  const handleDelete = async () => {
    const isDeleted = await deleteNote(note._id, notesDispatch);
    if (isDeleted) {
      const newSelectedNotes = selectedNotes.filter(
        (n: any) => n._id !== note._id
      );
      setSelectedNotes(newSelectedNotes);
    }
  };

  if (editMode) {
    return (
      <NoteUpdateForm
        setNote={setNote}
        note={currentNote}
        setEditMode={setEditMode}
      />
    );
  }

  if (showConfirm) {
    return (
      <div className="w-[250px] h-[300px] bg-[#081c15] py-5 px-7 rounded-md">
        <ConfirmationForm
          setShowConfirm={setShowConfirm}
          acceptFunction={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className="w-[250px] h-[300px] bg-[#081c15] py-5 px-7 rounded-md">
      <div className="flex justify-between items-center mb-4 pb-2 border-b-[.2px] border-[#71bb9a8e] ">
        <h3 className="capitalize text-lg font-semibold text-[#50b688]">
          {currentNote.title ? currentNote.title : "title"}
        </h3>
        <div className="flex gap-4 text-sm">
          <AiTwotoneEdit
            onClick={() => setEditMode(true)}
            className="text-lg text-[#40916c] hover:text-[#1B4332] cursor-pointer transition-all"
          />
          <AiFillDelete
            onClick={() => setShowConfirm(true)}
            className="text-lg text-[#40916c] hover:text-[#1B4332] cursor-pointer transition-all"
          />
        </div>
      </div>
      <div id="content" className="text-sm">
        <p>{currentNote.text}</p>
      </div>
    </div>
  );
};

export default Note;
