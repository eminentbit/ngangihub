import express from "express";
import { createNjangi } from "../controllers/create.njangi.controller";

const router = express.Router();

router.post("/", createNjangi);

export default router;
