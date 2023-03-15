import { timeStamp } from "console";
import { Schema, model } from "mongoose";

interface INote {
  text: string;
  title: string;
  project: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  createdAt?: any;
  updatedAt?: any;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: {} }
);
const Note = model("Note", NoteSchema);

export default Note;
