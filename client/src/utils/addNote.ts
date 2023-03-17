import axios from "axios";
import { apiUrl } from "./apiUrl";

const addNote: any = async (data: FormData, notesDispatch: any) => {
  try {
    const url: string = apiUrl + "notes/";
    const response = await axios.post(url, data, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    notesDispatch({ type: "add", note: response.data.note });
    return response.data.note;
  } catch (err: any) {
    console.log(err);
  }
};

export default addNote;
