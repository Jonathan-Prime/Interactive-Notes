import { InferSchemaType, model, Schema } from "mongoose";

const subTaskSchema = new Schema({
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false }
});

const noteSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    createdBy: {
        type: String,
        required: function () {
            return this.pairmode && this.pairmode.isActive;
        },
    },
    subTasks: [subTaskSchema]
}, { timestamps: true });


type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
