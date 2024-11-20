import { InferSchemaType, model, Schema } from "mongoose";
import _ from "lodash";

const boardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pairId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return this.pairmode && this.pairmode.isActive;
    },
  },
  title: {
    type: String,
    required: true,
  },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

type Board = InferSchemaType<typeof boardSchema>;

export default model<Board>("Board", boardSchema);
