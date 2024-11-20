import { RequestHandler } from "express";
import createHttpError from "http-errors";
import BoardModel from "../models/board";
import ColumnModel from "../models/column";

export const getAllColumns: RequestHandler = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const columns = await ColumnModel.find({ boardId: new Object(boardId) })
      .populate({
        path: "notes",
        select: "title",
      })
      .exec();
    res.status(200).json(columns);
  } catch (error) {
    next(error);
  }
};

export const addColumn: RequestHandler<any, any, any, any> = async (
  req,
  res,
  next
) => {
  const { titles } = req.body;

  try {
    if (!titles || titles.length === 0) {
      throw createHttpError(400, "column titles are required");
    }

    const newColumns = await Promise.all(
      titles.map(async (title) => {
        const newColumn = await ColumnModel.create({
          title: title,
          boardId: req?.params.boardId,
        });

        await BoardModel.updateOne(
          { _id: newColumn.boardId },
          { $push: { columns: newColumn._id } }
        );

        return newColumn;
      })
    );

    res.status(201).json(newColumns);
  } catch (error) {
    next(error);
  }
};

export const deleteColumn: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const column = await ColumnModel.findById(req.params.id);
    if (!column) {
      throw createHttpError(404, "Column not found");
    }

    await column.remove(); // use the remove method on the returned document

    res.status(200).json({ message: "Column deleted successfully" });
  } catch (error) {
    next(error);
  }
};
