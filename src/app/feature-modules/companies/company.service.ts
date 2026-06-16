import { hashPassword } from "../../utilities/hash-password.js";
import userService from "../users/user.service.js";
import companyRepo from "./company.repo.js";
import { companyResponse } from "./company.response.js";
import type { company } from "./company.types.js";

const add = async(company: Omit<company, "id">, userEmail: string) => {
    try {
        const result = await companyRepo.add(company);
        const user = {
            name: "name",
            email: userEmail,
            password: (await hashPassword("password")).toString(),
            company_id : result.id,
            password_version: 0,
            role: "CompanyAdmin"
        }
        await userService.add(user);
        return companyResponse.COMPANY_CREATED;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const getAll = () => companyRepo.findAll();

const search = async(company: Partial<company>) => {
    try {
        const result = await companyRepo.search(company);
        return result;
    } catch (error) {
        throw error;
    }
}

const update = async(id: string, company: Partial<company>) => {
    try {
        await companyRepo.update(id, company);
        return companyResponse.COMPANY_UPDATED
    } catch (error) {
        throw error;
    }
}

const deleteById = async(id: string) => {
    try {
        await companyRepo.deleteById(id);
        return companyResponse.COMPANY_DELETED;
    } catch (error) {
        throw error;
    }
}



export default {
    add,
    getAll,
    search,
    update,
    deleteById
}