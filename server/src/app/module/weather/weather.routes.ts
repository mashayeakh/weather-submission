import { Router } from "express";
import { getAllWeather, getCities, getCityWeather } from "./weather.controller";


const router = Router();


router.get("/cities", getCities);
router.get("/weather", getAllWeather);
router.get("/weather/:cityId", getCityWeather);

export default router;
