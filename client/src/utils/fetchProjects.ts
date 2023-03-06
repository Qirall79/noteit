import axios from "axios";

const fetchProjects = async (authorId: string, setProjects: any) => {
  try {
    const url: string = "http://localhost:5000/projects/" + authorId;
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    setProjects(response.data.projects);
  } catch (err) {
    console.log(err);
  }
};

export default fetchProjects;
