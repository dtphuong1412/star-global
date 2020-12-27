import express, { NextFunction, Request, Response } from "express";
import http from "http";
import wishListRouter from "./routes/wish-list/wish-list";
import { sequelize } from "./db";
import DbException from "./exceptions/dbException";
import ValidationException from "./exceptions/validationException";
import {
  AuthenticationErrorResponseDTO,
  DbErrorResponseDTO,
  ValidationErrorResponseDTO,
} from "./types/error";
import { USER_ID_REQUEST_HEADER } from "./utils/constants";
import AuthenticationException from "./exceptions/authenticationException";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  const userId = req.headers[USER_ID_REQUEST_HEADER];
  if (userId) {
    next();
  } else {
    next(
      new AuthenticationException(`Missing header ${USER_ID_REQUEST_HEADER}`)
    );
  }
});

app.use("/wish-list", wishListRouter);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DbException) {
    res.status(500).json(new DbErrorResponseDTO(err.message, err.errorCode));
  }
  if (err instanceof ValidationException) {
    res
      .status(400)
      .json(new ValidationErrorResponseDTO(err.message, err.rules));
  }
  if (err instanceof AuthenticationException) {
    res.status(400).json(new AuthenticationErrorResponseDTO(err.message));
  }
});

const port = 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("listening", async () => {
  console.log("listening on port 3000");
  try {
    await sequelize.authenticate();
    console.log("Success connecto db");
  } catch {
    console.log("Error when connection to db");
  }
});
