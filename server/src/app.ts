import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors"
import createHttpError, { isHttpError } from "http-errors";
import notesRoutes from "./routes/notes";
import columnsRoutes from "./routes/columns";
import boardsRoutes from "./routes/boards";
import usersRoutes from "./routes/private";
import authRoutes from "./routes/auth";
import reviewRoutes from "./routes/review";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());


// authentication 
app.use('/auth', authRoutes);

app.use("/private", usersRoutes, boardsRoutes, columnsRoutes, notesRoutes, reviewRoutes);

app.get("/", (req, res) =>
    res.json({ success: true, message: "Interactive Note api is running!" })
);


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Interactive Note API",
            version: "1.0.0",
            description: "Test/Production API for Interactive Note",
        },
        servers: [
            { url: "http://localhost:4000" },
            { url: "PRD", }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        "tags": [
            {
                "name": "Authentication",
                "x-tagGroups": [
                    {
                        "key": "auth",
                        "order": 1
                    }
                ]
            },
            {
                "name": "User",
                "x-tagGroups": [
                    {
                        "key": "user",
                        "order": 2
                    }
                ]
            },
            {
                "name": "Boards",
                "x-tagGroups": [
                    {
                        "key": "boards",
                        "order": 3
                    }
                ]
            },
            {
                "name": "Reviews",
                "x-tagGroups": [
                    {
                        "key": "reviews",
                        "order": 4
                    }
                ]
            },
            {
                "name": "Notes",
                "x-tagGroups": [
                    {
                        "key": "notes",
                        "order": 5
                    }
                ]
            }
        ],
    },
    apis: ["src/swagger/*.ts"],
};


// Generate Swagger documentation
const specs = swaggerJsDoc(options);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "Internal Server Error";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;