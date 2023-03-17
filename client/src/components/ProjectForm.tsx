import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleSharp } from "react-icons/io5";
import { UserContext } from "../contexts/userContext";
import addProject from "../utils/addProject";

interface Props {
  projects: any;
  setProjects: any;
}

interface FormData {
  name: string;
  author: string;
}

const ProjectForm: React.FC<Props> = ({ projects, setProjects }) => {
  // get user context
  const user = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [isRepeated, setRepeated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleClick = async (data: FormData) => {
    // check if project already exists
    const existent = projects.filter(
      (p: any) => p.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existent.length || data.name.toLowerCase() === "all") {
      setRepeated(true);
      return;
    }

    setRepeated(false);
    data.author = user.id;

    await addProject(data, setProjects, projects);
    setEditMode(false);
  };

  if (editMode) {
    return (
      <div className="w-full h-[300px] mt-8 pt-8 px-2 md:px-7 rounded-md">
        <form method="post" className="flex flex-col items-start gap-5">
          <div className="form-group w-full max-w-[500px] form-group flex flex-col gap-1">
            <label className="font-bold text-md text-[#081C15]" htmlFor="name">
              Name
            </label>
            <input
              {...register("name", { required: "Project name is required" })}
              className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#1c4231] mb-1"
              type="text"
              name="name"
              id="name"
            />
            <p className="text-sm font-medium text-[#ccff33]">
              {errors?.name?.message ||
                (isRepeated ? "Project already exists." : "")}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <button
              onClick={handleSubmit(handleClick)}
              className="py-2 w-20 rounded-md text-sm bg-[#081C15] hover:bg-[#081c159f] text-white transition-all font-medium"
              type="submit"
            >
              Add
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="py-2 w-20 rounded-md text-sm bg-[#081C15] hover:bg-[#081c159f] text-white transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditMode(true)}
      className="cursor-pointer text-black mt-8 px-5 md:px-10 py-3 font-medium text-lg hover:bg-[#20533C] hover:text-white transition-all"
    >
      <p className="flex gap-3 md:gap-5 text-sm md:text-md items-center">
        <IoAddCircleSharp className="text-2xl md:text-3xl" /> Add project
      </p>
    </div>
  );
};

export default ProjectForm;
