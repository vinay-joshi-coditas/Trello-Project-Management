import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../../routes/routes.types.js";
import userService from "./user.service.js";
import { hashPassword } from "../../utilities/hash-password.js";

const router = Router();

router.post("/add", async (req, res, next) => {
    try {
        const result = userService.add(req.body);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})

router.patch("/update/:id", async(req, res, next) => {
    try {
        req.body.password = await hashPassword(req.body.password);
        const result = await userService.update(req.params.id, req.body);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
})



export default new Route("/user", router);