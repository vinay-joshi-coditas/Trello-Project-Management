export const companyResponse: Record<"COMPANY_CREATED" | "COMPANY_DELETED" | "COMPANY_UPDATED", {statusCode: number, message: string} > = {
    COMPANY_CREATED: {
        statusCode: 201,
        message: "Company created successfully."

    },
    COMPANY_DELETED: {
        statusCode: 200,
        message: "Company deleted successfully."
    },
    COMPANY_UPDATED: {
        statusCode: 200,
        message: "Company updated successfully"
    }
}