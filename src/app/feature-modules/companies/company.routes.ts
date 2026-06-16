import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import companyService from "./company.service.js";
import { Route } from "../../routes/routes.types.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.post("/add", async(req, res, next) => {
    try {
        const email = req.body.email;
        const result = await companyService.add(req.body, email);
        res.send(new ResponseHandler(result));
    } catch (error) {
        console.log(error);
        
        next(error);
    }
})

router.get("/getAll", authenticate, async(req, res, next) => {
    try {
        const result = await companyService.getAll();
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})

router.get("/search", async(req, res, next) => {
    try {
        console.log("inside search route");
        
        const query = req.query;
        console.log(query);
        
        const result = await companyService.search(query);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})

router.patch("/update/:id", async(req, res, next) => {
    try {
        const result = companyService.update(req.params.id, req.body);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})

router.delete("/delete/:id", async(req, res, next) => {
    try {
        const userId = req.params.id;
        const result = companyService.deleteById(userId);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})



export default new Route("/company", router)