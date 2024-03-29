import axios from "axios";
import { apiUrl } from "./apiUrl";

const deleteNote: any = async (id: string, notesDispatch: any) => {
  try {
    const url: string = apiUrl + "notes/";
    await axios.delete(url + id, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    notesDispatch({ type: "delete", id });
    return true;
  } catch (err: any) {
    console.log(err);
    return false;
  }
};

export default deleteNote;
