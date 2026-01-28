import { Router } from "express";
import { getAllServices, addService, updateService, deleteService, getServiceById } from "../controllers/services.controller.js";

const router = Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById)
router.post('/', addService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;