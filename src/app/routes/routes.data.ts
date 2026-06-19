import authRoutes from "../feature-modules/auth/auth.routes.js";
import companyRoutes from "../feature-modules/companies/company.routes.js";
import permissionRoutes from "../feature-modules/permissions/permission.routes.js";
import rolePermissionRoutes from "../feature-modules/rolePermissions/rolePermission.routes.js";
import roleRoutes from "../feature-modules/roles/role.routes.js";
import userRoutes from "../feature-modules/users/user.routes.js";
import type { Routes } from "./routes.types.js";

export const routes : Routes = [authRoutes, companyRoutes, userRoutes, roleRoutes, permissionRoutes, rolePermissionRoutes];