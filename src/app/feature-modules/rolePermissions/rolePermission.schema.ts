import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";
import { Role } from "../roles/role.schema.js";
import { Permission } from "../permissions/permission.schema.js";

export class RolePermission extends Model<InferAttributes<RolePermission>, InferCreationAttributes<RolePermission>>{
    declare id: CreationOptional<string>;
    declare role_id: ForeignKey<Role['id']>;
    declare permission_id: ForeignKey<Permission['id']>;
}

RolePermission.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => crypto.randomUUID(),
        primaryKey: true
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {model: Role, key: 'id'}
    },
    permission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {model: Permission, key: 'id'}
    }
}, 
{
    sequelize,
    tableName: "role_permissions",
    timestamps: false
}
)