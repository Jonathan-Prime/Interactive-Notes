import express from "express";
import * as NotesController from "../controllers/notes";
import { protect } from "../middlewares/authProtect";

const router = express.Router();

router.get("/get-all-notes", NotesController.getNotes);

router.get("/get-note/:noteId", protect, NotesController.getNote);

router.post("/create-note/:boardId", NotesController.createNote);

router.patch("/update-note/:noteId", NotesController.updateNote);

router.delete("/deleteNote/:boardId/:noteId", NotesController.deleteNote);

router.patch("/push-note-to-board/:noteId/:newBoardId", NotesController.pushNoteToBoard);

export default router;