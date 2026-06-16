import { Op } from "sequelize";
import { Company } from "./companies.schema.js";
import type { company } from "./company.types.js";

const add = (company: Omit<company, "id">) => Company.create(company)

const findAll = () => Company.findAll();

const search = async(query: any) => {
    try {
        const{search, sortBy, filter, sortOrder = 'ASC', limit} = query;
        const queryObject : any = {};
        if(search) {
            queryObject.name = {
                [Op.iLike]: `${search}%`
            }
        }
        if(filter) {
            queryObject.subscription_type = filter
        }

        return await Company.findAll({
            where: queryObject,
            order: [[sortBy, sortOrder]],
            limit
        })

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const update = (id: string, company: Omit<Partial<company>, "id">) => Company.update(company, {where: {id}})

const deleteById = (id: string) => Company.destroy({where: {id}});

export default{
    add,
    findAll,
    search,
    update,
    deleteById
}