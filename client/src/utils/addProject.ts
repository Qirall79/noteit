import axios from "axios";

const addProject: any = async (
  data: FormData,
  setProjects: any,
  projects: any
) => {
  try {
    const url: string = "http://localhost:5000/projects/";
    const response = await axios.post(url, data, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    setProjects([...projects, response.data.project]);
  } catch (err: any) {
    console.log(err);
  }
};

export default addProject;
