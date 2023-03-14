import axios from "axios";

type FormData = {
  text: string;
  title: string;
  author: string;
  project: string;
  _id: string;
};

const updateNote: any = async (data: FormData, notesDispatch: any) => {
  try {
    const url: string = "http://localhost:5000/notes/";
    await axios.put(url + data._id, data, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    notesDispatch({ type: "update", id: data._id, note: data });
    return { success: true, data };
  } catch (err: any) {
    console.log(err);
    return { success: false };
  }
};

export default updateNote;
