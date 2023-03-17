import axios from "axios";
import { apiUrl } from "./apiUrl";

const fetchNotes = async (authorId: string, notesDispatch: any) => {
  try {
    const url: string = apiUrl + "notes/" + authorId;
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    notesDispatch({
      type: "fetch",
      notes: response.data.notes,
    });
  } catch (err) {
    console.log(err);
  }
};

export default fetchNotes;
