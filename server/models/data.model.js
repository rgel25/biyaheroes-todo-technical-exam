const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  // ○ todoReference:string - unique, non-editable
  // ○ todoTitle:string - unique, editable
  // ○ todoDescription:string - editable
  // ○ todoDatetimestamp:number<YYYYMMDDHHmmss> - non-editable
  todoReference: {
    type: String,
    immutable: true,
    unique: true,
    required: true,
  },
  todoTitle: {
    type: String,
    required: true,
    unique: true,
  },
  todoDescription: {
    type: String,
    required: true,
  },
  todoDatetimestamp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
