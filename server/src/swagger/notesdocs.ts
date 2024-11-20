/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNoteDTO:
 *       type: object
 *       required:
 *         - boardId
 *         - title
 *         - description 
 *         - status
 *         - priority
 *         - subTasks
 *         - createdBy
 *       properties:
 *         boardId:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *         priority:
 *           type: string
 *         subTasks:
 *           type: array
 *         createdBy:
 *           type: string
 * 
 *     UpdateNoteDTO:
 *       type: object
 *       required:
 *         - noteId
 *         - newTitle
 *         - newText 
 *         - newStatus
 *         - newPriority
 *         - newSubTasks
 *       properties:
 *         noteId:
 *           type: string
 *         newTitle:
 *           type: string
 *         newText:
 *           type: string
 *         newStatus:
 *           type: string
 *         newPriority:
 *           type: string
 *         newSubTasks:
 *           type: array
 * 
 *     DeleteNoteDTO:
 *       type: object
 *       required:
 *         - boardId
 *         - noteId
 *       properties:
 *         boardId:
 *           type: string
 *         noteId:
 *           type: string
 *
 * 
 * /private/get-note/{noteId}:
 *   get:
 *     tags: [Notes]
  *     parameters:
 *       - name: noteId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description:
 * 
 * /private/create-note/{boardId}:
 *   post:
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteDTO'
 *     responses:
 *       200:
 *         description:
 * 
 * /private/update-note/{noteId}:
 *   patch:
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteDTO'
 *     responses:
 *       200:
 *         description:
 * 
 * /private/deleteNote/{boardId}/{noteId}:
 *   delete:
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteNoteDTO'
 *     responses:
 *       200:
 *         description:
 * 
 */
