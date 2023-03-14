import axios from "axios";

const fetchNotes = async (authorId: string, notesDispatch: any) => {
  try {
    const url: string = "http://localhost:5000/notes/" + authorId;
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
