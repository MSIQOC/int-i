import express from "express";
import routes from "./routes";
import {
    PostLogin,
    PostJoin,
    Logout
} from "../controllers/globalController";
import {
    IsLogged,
    IsNotLogged
} from "../middleware/auth";

const globalRouter = express.Router();

globalRouter.post(routes.join, IsNotLogged, PostJoin, PostLogin);
globalRouter.post(routes.login, IsNotLogged, PostLogin);
globalRouter.get(routes.logout, IsLogged, Logout);
globalRouter.post(routes.logout, IsLogged, Logout);

export default globalRouter;