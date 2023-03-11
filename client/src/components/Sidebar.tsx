import React from "react";

interface Props {
  projects: any;
  setSelected: any;
}

const Sidebar: React.FC<Props> = ({ projects, setSelected }): any => {
  const handleClick = (e: any) => {
    const element = e.target.dataset.id;
    const current = document.querySelector(".selected");
    current?.classList.remove("bg-[#2d6a4f]");
    current?.classList.remove("selected");
    e.target.classList.add("bg-[#2d6a4f]");
    e.target.classList.add("selected");
    setSelected(element);
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
              className="cursor-pointer px-10 py-3 font-medium text-lg hover:bg-[#20533c] transition-all"
              onClick={handleClick}
              key={project._id}
              data-id={project._id}
            >
              {project.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
