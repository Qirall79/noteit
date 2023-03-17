import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import { AiFillDelete } from "react-icons/ai";
import deleteProject from "../utils/deleteProject";
import ConfirmationForm from "./ConfirmationForm";

interface Props {
  projects: any;
  setSelected: any;
  setProjects: any;
}

const Sidebar: React.FC<Props> = ({
  projects,
  setSelected,
  setProjects,
}): any => {
  // show confirmation form
  const [showConfirm, setShowConfirm] = useState("");

  const handleClick = (e: any) => {
    const element = e.target.dataset.id;
    const current = document.querySelector(".selected");
    current?.classList.remove("bg-[#2d6a4f]");
    current?.classList.remove("selected");
    e.target.classList.add("bg-[#2d6a4f]");
    e.target.classList.add("selected");
    setSelected(element);
  };

  const handleDelete = async (e: any) => {
    const target =
      e.target.nodeName.toLowerCase() === "path"
        ? e.target.parentElement
        : e.target;

    const id = target.getAttribute("id");
    setShowConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    await deleteProject(id, setProjects, projects);
  };

  return (
    <div className=" bg-[#40916c] text-white h-full py-20 ">
      <ul className=" flex flex-col gap-5">
        <li
          data-id="all"
          className="cursor-pointer px-10 py-3 font-medium text-lg bg-[#2d6a4f] hover:bg-[#20533c] transition-all selected"
          onClick={handleClick}
        >
          All
        </li>
        {projects.map((project: any) => {
          return (
            <li
              className={`group cursor-pointer flex items-center justify-between px-10 py-3 font-medium text-lg hover:bg-[#20533c] ${
                showConfirm === project._id ? "bg-[#20533c]" : ""
              } transition-all `}
              onClick={handleClick}
              key={project._id}
              data-id={project._id}
            >
              {showConfirm === project._id ? (
                <div className="w-full ">
                  <ConfirmationForm
                    showConfirm={showConfirm}
                    acceptFunction={confirmDelete}
                    setShowConfirm={setShowConfirm}
                  />
                </div>
              ) : (
                <>
                  <p>{project.name}</p>
                  <AiFillDelete
                    onClick={handleDelete}
                    id={project._id}
                    className="hidden group-hover:inline-block"
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
      <ProjectForm projects={projects} setProjects={setProjects} />
    </div>
  );
};

export default Sidebar;
