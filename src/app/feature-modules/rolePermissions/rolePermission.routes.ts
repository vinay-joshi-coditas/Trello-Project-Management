import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import rolePermissionService from "./rolePermission.service.js";
import { Route } from "../../routes/routes.types.js";
import { ZAssignPermissions } from "./rolePermission.types.js";
import { body } from "../../utilities/validate.js";

const router = Router();

router.post("/add/:roleId/permissions", body(ZAssignPermissions), async (req, res, next) => {
  try {
    const id = req.params.roleId;
    
    const { permissionIds } = req.body;

    const result = await rolePermissionService.add(id as string, permissionIds);

    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.put("/add/:roleId/permissions", body(ZAssignPermissions), async (req, res, next) => {
  try {
    const id = req.params.roleId;

    const { permissionIds } = req.body;

    const result = await rolePermissionService.update(id as string, permissionIds);

    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:roleId/permissions", async (req, res, next) => {
  try {
    const id = req.params.roleId;

    const result = await rolePermissionService.deleteByRoleId(id as string);

    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

export default new Route("/role-permission", router);
