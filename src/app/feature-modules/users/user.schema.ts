import {DataTypes,Model,type CreationOptional,type ForeignKey,type InferAttributes,type InferCreationAttributes,} from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";
import { Company } from "../companies/companies.schema.js";

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare company_id: ForeignKey<Company["id"]>;
  declare password_version: number;
  declare role: string;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => crypto.randomUUID(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Company, key: "id" },
    },
    password_version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    role: {
      type: DataTypes.ENUM("SuperAdmin", "CompanyAdmin", "Member"),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  },
);
