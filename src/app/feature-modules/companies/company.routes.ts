import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import companyService from "./company.service.js";
import { Route } from "../../routes/routes.types.js";
import { authenticate } from "../auth/auth.middleware.js";
import { uploadFile } from "../../services/s3.service.js";
import { upload } from "../../utilities/upload.middleware.js";
import { error } from "node:console";
import { body } from "../../utilities/validate.js";
import { ZCompanyCreate } from "./company.types.js";

const router = Router();

router.post("/add", authenticate, upload.single("logo"), body(ZCompanyCreate), async(req, res, next) => {
    try {
        const email = req.body.email;
        const identifier = `${req.body.name}_logo`;

        const user = (req as any).user;
        console.log(user);
        req.body.logo = identifier;
        req.body.createdBy = user.id

        await uploadFile(identifier, req.file!);

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

router.patch("/archive/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = companyService.archive(id)
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

// router.post("/upload", upload.single("file"), async(req, res, next) => {
//     const key = await uploadFile(req.file!);
//     res.send(new ResponseHandler(key));
// })  



router.get("/get-url",async(req,res,next)=>{
    try{
        const key = req.body.key;
        const url = await companyService.getURL(key);
        if(!url)res.send(new ResponseHandler("url not found "))
        res.send(new ResponseHandler(url));

    }catch(e){
        next(e)
    }
})

export default new Route("/company", router)