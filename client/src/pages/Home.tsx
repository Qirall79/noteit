/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useReducer } from "react";
import fetchProjects from "../utils/fetchProjects";
import fetchNotes from "../utils/fetchNotes";
import Sidebar from "../components/Sidebar";
import Notes from "../components/Notes";
import { UserContext } from "../contexts/userContext";
import { NotesContext, NotesDispatchContext } from "../contexts/notesContext";
import notesReducer from "../reducers/notesReducer";
import { MutatingDots } from "react-loader-spinner";

interface IUser {
  id: string;
  username: string;
  email: string;
}

const Home: React.FC<any> = (): any => {
  // get user from context
  const user = useContext(UserContext);

  // Reducers
  const [notes, notesDispatch] = useReducer(notesReducer, []);

  // component state
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState("all");
  const [loaded, setLoaded] = useState(false);

  // get user projects and notes
  const getData = async () => {
    await fetchProjects(user.id, setProjects);
    await fetchNotes(user.id, notesDispatch);
    setLoaded(true);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!loaded) {
    return (
      <div className="w-full min-h-[94.4vh] bg-[#1b4332] flex items-center justify-center">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[94.4vh] grid grid-cols-[1fr_5fr] bg-slate-200">
      <NotesContext.Provider value={notes}>
        <NotesDispatchContext.Provider value={notesDispatch}>
          <Sidebar
            projects={projects}
            setProjects={setProjects}
            setSelected={setSelected}
          />
          <Notes project={selected} />
        </NotesDispatchContext.Provider>
      </NotesContext.Provider>
    </div>
  );
};

export default Home;
