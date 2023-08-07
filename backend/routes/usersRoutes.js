import express from "express";
import {
    createUser
} from "../controllers/usersController.js";

const router = express.Router();

// Route to create user
router.post('/', createUser);

export default router;