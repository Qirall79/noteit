import axios from "axios";
import { apiUrl } from "./apiUrl";

const addProject: any = async (
  data: FormData,
  setProjects: any,
  projects: any
) => {
  try {
    const url: string = apiUrl + "projects/";
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
