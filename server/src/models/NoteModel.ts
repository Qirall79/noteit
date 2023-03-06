import { Schema, model } from "mongoose";

interface INote {
  text: string;
  project: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
}

const NoteSchema = new Schema<INote>({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});
const Note = model("Note", NoteSchema);

export default Note;
