import express from "express";
import * as ColumnsController from "../controllers/columns";
import { protect } from '../middlewares/authProtect'

const router = express.Router();

router.get('/get-all-columns', protect, ColumnsController.getAllColumns);

// router.get('/get-board/:boardId', protect, ColumnsController.getSingleBoard);

router.post('/add-column/:boardId', protect, ColumnsController.addColumn);

// router.patch('/update-board/:boardId', ColumnsController.updateBoard);

router.delete('/delete-column/:boardId', ColumnsController.deleteColumn);


export default router;