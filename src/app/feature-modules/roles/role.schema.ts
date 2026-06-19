import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { Company } from "../companies/company.schema.js";
import { sequelize } from "../../connections/pg.connection.js";

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare company_id: ForeignKey<Company['id']>;
}

Role.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => crypto.randomUUID(),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {model: Company, key: 'id'}
    }
}, 
{
    sequelize,
    tableName: "roles",
    timestamps: false
}
)