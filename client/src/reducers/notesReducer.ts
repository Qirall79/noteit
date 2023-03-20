const notesReducer = (notes: any, action: any) => {
  switch (action.type) {
    case "fetch":
      return action.notes;
    case "add":
      return [...notes, action.note];
    case "delete":
      return notes.filter((note: any) => note._id !== action.id);
    case "update":
      notes = notes.filter((note: any) => note._id !== action.id);
      return [...notes, action.note];
    case "remove project":
      console.log(notes);
      notes = notes.filter((note: any) => note.project !== action.project);
      return [...notes];
    default:
      return [];
  }
};

export default notesReducer;
