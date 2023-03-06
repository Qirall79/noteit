/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import fetchProjects from "../utils/fetchProjects";
import fetchNotes from "../utils/fetchNotes";
import Sidebar from "../components/Sidebar";
import Notes from "../components/Notes";

interface IUser {
  id: string;
  username: string;
  email: string;
}

interface Props {
  user: IUser;
}

const Home: React.FC<Props> = ({ user }): any => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState("all");
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getProjects = async () => {
    await fetchProjects(user.id, setProjects);
    setLoaded(true);
  };
  const getNotes = async () => {
    await fetchNotes(user.id, setNotes);
    setLoaded(true);
  };

  useEffect(() => {
    getProjects();
    getNotes();
  }, []);

  if (!loaded) {
    return <div className="w-full min-h-[94.4vh] bg-slate-200">Loading...</div>;
  }

  return (
    <div className="w-full min-h-[94.4vh] grid grid-cols-[1fr_5fr] bg-slate-200">
      <Sidebar projects={projects} setSelected={setSelected} />
      <Notes project={selected} notes={notes} />
    </div>
  );
};

export default Home;
