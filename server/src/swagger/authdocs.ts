/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDTO:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 * 
 *     VerifyEmailDTO:
 *       type: object
 *       required:
 *         - id
 *         - token
 *       properties:
 *         id:
 *           type: string
 *         token:
 *           type: string
 *
 *     ForgotPasswordDTO:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 * 
 *     ResetPasswordDTO:
 *       type: object
 *       required:
 *         - resetToken
 *       properties:
 *         resetToken:
 *           type: string
 *
 *
 * /auth/signup:
 *   post:
 *     description: Register a new user with the given username, email, and password
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       200:
 *          description:
 *
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: 
 *      
 * /auth/:id/verify/{token}:
 *   post:
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmailDTO'
 *     responses:
 *       200:
 *         description: 
 *      
 * /auth/forgotpassword:
 *   post:
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordDTO'
 *     responses:
 *       200:
 *         description: 
 * /auth/reset-password/{resetToken}:
 *   put:
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordDTO'
 *     responses:
 *       200:
 *         description: 
 *      
 */
