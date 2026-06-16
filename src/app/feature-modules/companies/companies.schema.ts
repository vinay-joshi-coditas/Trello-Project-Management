import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { sequelize } from "../../connections/pg.connection.js"

export class Company extends Model <InferAttributes<Company>,InferCreationAttributes<Company>>{
  declare id :CreationOptional<string>
  declare name:string
  declare subscription_type: string
  declare logo :string

  
}
Company.init({
  id:{
    type:DataTypes.UUID,
    defaultValue:crypto.randomUUID(),
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  subscription_type: {
    type: DataTypes.ENUM("Basic", "Half features", "All features"),
    allowNull: false
  },
  logo:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
  sequelize,
  tableName:"companies",
  timestamps:false
})
