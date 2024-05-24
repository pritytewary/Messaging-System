import express from "express";
import { signup } from "../controllers/authcontroller/signup.js";
import { login } from "../controllers/authcontroller/login.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
