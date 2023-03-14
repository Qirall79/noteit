import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NotesDispatchContext } from "../contexts/notesContext";
import updateNote from "../utils/updateNote";

// form data type
type FormData = {
  text: string;
  title: string;
  author: string;
  project: string;
  _id: string;
};

// props type
type Props = {
  note: any;
  setNote: any;
  setEditMode: any;
};

const NoteUpdateForm: React.FC<Props> = ({ note, setEditMode, setNote }) => {
  // get notes dispatch function
  const notesDispatch = useContext(NotesDispatchContext);

  const handleClick = async (data: any) => {
    // check if nothing changed
    if (data.title === note.title && data.text === note.text) {
      return;
    }

    data.author = note.author;
    data.project = note.project;
    data._id = note._id;

    const res = await updateNote(data, notesDispatch);
    if (res.success) {
      setNote(res.data);
    }

    // exit edit mode
    setEditMode(false);
  };

  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className="w-[250px] h-[300px] bg-[#081c15] pt-8 px-7 rounded-md">
      <form method="post" className="flex flex-col items-start gap-5">
        <div className="form-group w-full max-w-[500px] form-group flex flex-col gap-1">
          <label
            className=" text-sm font-medium text-[#50B688]"
            htmlFor="title"
          >
            Title
          </label>
          <input
            defaultValue={note.title}
            {...register("title", { required: "Title is required" })}
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#1c4231] mb-1"
            type="text"
            name="title"
            id="title"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.title?.message}
          </p>
        </div>
        <div className="form-group w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className=" text-sm font-medium text-[#50B688]" htmlFor="text">
            Body
          </label>
          <textarea
            defaultValue={note.text}
            {...register("text", { required: "Please provide note body" })}
            className="h-8 rounded-sm outline-none pl-2 pt-2 text-sm text-white bg-[#1c4231] mb-1"
            name="text"
            id="text"
          ></textarea>
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.text?.message}
          </p>
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={handleSubmit(handleClick)}
            className="w-[70px] h-[30px] font-medium rounded-md text-sm hover:bg-[#265e45] transition-all bg-[#50B688]"
            type="submit"
          >
            Done
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditMode(false);
            }}
            className="w-[70px] h-[30px] font-medium rounded-md text-sm hover:bg-[#265e45] transition-all bg-[#50B688]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteUpdateForm;
