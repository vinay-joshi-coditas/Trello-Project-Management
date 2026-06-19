import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../../routes/routes.types.js";
import roleService from "./role.service.js";

const router = Router();

router.post("/add", async(req, res, next) => {
    try {
        const result = await roleService.add(req.body);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})


export default new Route("/role", router);