/**
 * @swagger
 *
 * components:
 *   schemas:
 *     GetUserDTO:
 *       type: object
 * 
 *     ChangePasswordDTO:
 *       type: object
 *       required:
 *         - userId
 *         - newPassword
 *         - password
 *       properties:
 *         userId:
 *           type: string
 *         newPassword:
 *           type: string
 *         password:
 *           type: string
 * 
 *     PairInviteDTO:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 * 
 *     AcceptPairInviteDTO:
 *       type: object
 *       required:
 *         - token
 *         - userId
 *       properties:
 *         token:
 *           type: string
 *         userId:
 *           type: string
 *
 * /private/user:
 *   get:
 *     description: Get User
 *     tags: [User]
 *     responses:
 *       200:
 *         description:
 *        
 * /private/changepassword/{userId}:
 *   post:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordDTO'
 *     responses:
 *       200:
 *         description:
 *        
 * /private/pair-invite:
 *   post:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PairInviteDTO'
 *     responses:
 *       200:
 *         description:
 *        
 * /private/accept-pair/{token}/{userId}:
 *   put:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcceptPairInviteDTO'
 *     responses:
 *       200:
 *         description:
 *        
 * /private/toggle-pairmode:
 *   put:
 *     tags: [User]
 *     responses:
 *       200:
 *         description:
 *        
 * /private/unpair-user:
 *   put:
 *     tags: [User]
 *     responses:
 *       200:
 *         description:
 *        
 */
