import { Router } from "express";
import { getAllWeather, getCities, getCityWeather } from "./weather.controller";


const router = Router();

// GET /api/cities          — list all tracked cities
// GET /api/weather          — current conditions for all cities
// GET /api/weather/:cityId  — current conditions for one city
router.get("/cities", getCities);
router.get("/weather", getAllWeather);
router.get("/weather/:cityId", getCityWeather);

export default router;
