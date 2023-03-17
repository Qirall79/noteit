import axios from "axios";

const deleteProject: any = async (
  id: string,
  setProjects: any,
  projects: any
) => {
  try {
    const url: string = "http://localhost:5000/projects/";
    await axios.delete(url + id, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    const filtered = projects.filter((p: any) => p._id !== id);
    setProjects([...filtered]);
    return true;
  } catch (err: any) {
    console.log(err);
    return false;
  }
};

export default deleteProject;
