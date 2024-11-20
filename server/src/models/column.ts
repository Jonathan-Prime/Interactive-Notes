import { InferSchemaType, model, Schema, Document, Types } from "mongoose";

interface Column extends Document {
  title: string;
  boardId: string;
  notes: Types.ObjectId["_id"];
  remove: () => Promise<Column>;
}

const columnSchema = new Schema({
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  title: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

export default model<Column>("Column", columnSchema);
