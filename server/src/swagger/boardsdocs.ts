/**
 * @swagger
 * components:
 *   schemas:
 *     GetBoardDTO:
 *       type: object
 *       required:
 *         - boardId
 *       properties:
 *         boardId:
 *           type: string
 *
 *     CreateBoardDTO:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 * 
 *     EditBoardDTO:
 *       type: object
 *       required:
 *         - boardId
 *         - title
 *       properties:
 *         boardId:
 *           type: string
 *         title:
 *           type: string
 * 
 *     DeleteBoardDTO:
 *       type: object
 *       required:
 *         - boardId
 *       properties:
 *         boardId:
 *           type: string
 *
 *
 * /private/get-board/{boardId}:
 *   get:
 *     description: Get single board
 *     tags: [Boards]
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description:
 * 
 * /private/create-board:
 *   post:
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBoardDTO'
 *     responses:
 *       200:
 *         description:
 * 
 * /private/edit-board/{boardId}:
 *   patch:
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditBoardDTO'
 *     responses:
 *       200:
 *         description:
 * 
 * /private/delete-board/{boardId}:
 *   delete:
 *     description: Delete a board
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBoardDTO'
 *     responses:
 *       200:
 *         description:
 *        
 */
