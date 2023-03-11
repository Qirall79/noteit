/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import fetchProjects from "../utils/fetchProjects";
import fetchNotes from "../utils/fetchNotes";
import Sidebar from "../components/Sidebar";
import Notes from "../components/Notes";
import { UserContext } from "../contexts/userContext";

interface IUser {
  id: string;
  username: string;
  email: string;
}

const Home: React.FC<any> = (): any => {
  // get user from context
  const user = useContext(UserContext);

  // component state
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState("all");
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // get user projects and notes
  const getData = async () => {
    await fetchProjects(user.id, setProjects);
    await fetchNotes(user.id, setNotes);
    setLoaded(true);
  };

  useEffect(() => {
    getData();
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
