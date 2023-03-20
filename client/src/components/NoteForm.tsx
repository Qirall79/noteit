import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import addNote from "../utils/addNote";
import { UserContext } from "../contexts/userContext";
import { NotesDispatchContext } from "../contexts/notesContext";

type FormData = {
  text: string;
  title: string;
  author: string;
  project: string;
};

interface Props {
  project?: any;
  selectedNotes?: any;
  setSelectedNotes?: any;
}

const NoteForm: React.FC<Props> = ({
  project,
  selectedNotes,
  setSelectedNotes,
}) => {
  // get user context
  const user = useContext(UserContext);

  const notesDispatch = useContext(NotesDispatchContext);

  // display/hide form
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleClick = async (data: FormData) => {
    data.author = user.id;
    data.project = project;

    setEditMode(false);

    // update UI
    const note = await addNote(data, notesDispatch);
    if (note._id) {
      setSelectedNotes([...selectedNotes, note]);
    }
    reset({ text: "", title: "" });
    return;
  };

  if (editMode) {
    return (
      <div className="w-[220px] md:w-[250px] h-[300px] bg-[#081c15] pt-8 px-7 rounded-md">
        <form method="post" className="flex flex-col items-start gap-5">
          <div className="form-group w-full max-w-[500px] form-group flex flex-col gap-1">
            <label className="font-medium text-[#50B688]" htmlFor="title">
              Title
            </label>
            <input
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
            <label className="font-medium text-[#50B688]" htmlFor="text">
              Body
            </label>
            <textarea
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
              Add
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
  }
  return (
    <div className="w-[220px] md:w-[250px] h-[300px] bg-[#081c15] py-5 px-7 rounded-md">
      <IoMdAddCircleOutline
        onClick={() => setEditMode(true)}
        className="w-full h-full text-[#40916C] hover:text-[#1B4332] cursor-pointer transition-all"
      />
    </div>
  );
};

export default NoteForm;
