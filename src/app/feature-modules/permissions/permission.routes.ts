import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import permissionService from "./permission.service.js";
import { Route } from "../../routes/routes.types.js";

const router = Router();

router.post("/add", async(req, res, next) => {
    try {
        const result = await permissionService.add(req.body);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})

export default new Route("/permission", router);