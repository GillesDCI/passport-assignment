import express from "express";
import * as homeControllers from "../controllers/homeController.js";

const router = express.Router();

router.get("/", homeControllers.home);

module.exports = router;
