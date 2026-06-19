export const RolePermissionResponse : Record<"PERMISSION_ASSIGNED_SUCCESSFULLY" | "PERMISSION_REMOVED_SUCCESSFULLY", {statusCode: number, message: string}> = {
    PERMISSION_ASSIGNED_SUCCESSFULLY: {
        statusCode: 201,
        message: "PERMISSION ASSIGNED SUCCESSFULLY!!"
    },
    PERMISSION_REMOVED_SUCCESSFULLY: {
        statusCode: 200,
        message: "PERMISSION REMOVED SUCCESSFULLY!!"
    }
}