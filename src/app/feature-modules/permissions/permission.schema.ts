import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { Company } from "../companies/company.schema.js";
import { sequelize } from "../../connections/pg.connection.js";

export class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>>{
    declare id: CreationOptional<string>;
    declare name: string;
}

Permission.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => crypto.randomUUID(),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: "permissions",
    timestamps: false
}
)