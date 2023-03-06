import { Schema, model } from "mongoose";

interface IProject {
  name: string;
  author: Schema.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
});

const Project = model("Project", ProjectSchema);

export default Project;
