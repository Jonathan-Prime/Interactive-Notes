import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import BoardModel from "../models/board";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid task id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Task not found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title: string;
  description: string;
  status: string;
  priority: string;
  createdBy: string;
  subTasks?: { description: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNote: RequestHandler<any, any, CreateNoteBody, any> = async (
  req,
  res,
  next
) => {
  const { title, description, status, priority, subTasks, createdBy } =
    req.body;

  try {
    if (!title) {
      throw createHttpError(400, "title is required");
    }
    if (!status) {
      throw createHttpError(400, "status is required");
    }

    const newNote = await NoteModel.create({
      title: title,
      description: description,
      status: status,
      priority: priority,
      boardId: req?.params.boardId,
      createdBy: createdBy,
      subTasks: subTasks || [],
    });

    await BoardModel.updateOne(
      { _id: newNote.boardId },
      { $push: { notes: newNote._id } }
    );

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title: string;
  description: string;
  status: string;
  priority: string;
  subTasks: string[];
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req?.params.noteId;
  const newTitle = req?.body.title;
  const newText = req?.body.description;
  const newStatus = req?.body.status;
  const newPriority = req?.body.priority;
  const newSubTasks = req?.body.subTasks;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Task must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Task not found");
    }

    // use spread syntax to update the note object
    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      {
        ...note.toObject(),
        title: newTitle,
        description: newText,
        status: newStatus,
        priority: newPriority,
        subTasks: newSubTasks,
      },
      { new: true }
    ).exec();

    res
      .status(200)
      .json({ data: updatedNote, message: "task updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const boardId = req.params.boardId;
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    await NoteModel.findByIdAndDelete({ _id: noteId });
    await BoardModel.updateOne({ _id: boardId }, { $pull: { notes: noteId } });

    res.status(200).json({ message: "task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const pushNoteToBoard: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newBoardId = req.params.newBoardId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!mongoose.isValidObjectId(newBoardId)) {
      throw createHttpError(400, "Invalid new board id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    const oldBoardId: mongoose.Types.ObjectId = note.boardId;

    if (oldBoardId.equals(newBoardId)) {
      throw createHttpError(400, "Note is already on the new board");
    }

    const newBoard = await BoardModel.findById(newBoardId).exec();

    if (!newBoard) {
      throw createHttpError(404, "New board not found");
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      { ...note.toObject(), boardId: newBoardId },
      { new: true }
    ).exec();

    await BoardModel.updateOne(
      { _id: newBoardId },
      { $push: { notes: noteId } }
    );

    await BoardModel.updateOne(
      { _id: oldBoardId },
      { $pull: { notes: noteId } }
    );

    res.status(200).json({
      message: `Note transffered to "${newBoard.title}" successfully`,
    });
  } catch (error) {
    next(error);
  }
};
