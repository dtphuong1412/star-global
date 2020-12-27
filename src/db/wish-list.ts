import { Sequelize, DataTypes, Model } from "sequelize";
import { ModelName, SCHEMA, TableName } from "../utils/constants";

export class WishList extends Model {}

const init = (sequelize: Sequelize) => {
  WishList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "Id",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "Name",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "UserId",
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "CreatedBy",
      },
      createdAt: {
        type: "TIMESTAMP WITHOUT TIME ZONE",
        allowNull: true,
        field: "CreatedAt",
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "UpdatedBy",
      },
      updatedAt: {
        type: "TIMESTAMP WITHOUT TIME ZONE",
        allowNull: true,
        field: "UpdatedAt",
      },
    },
    {
      sequelize,
      modelName: ModelName.WishList,
      schema: SCHEMA,
      tableName: TableName.WishList,
      timestamps: false,
    }
  );
  return WishList;
};

export default { init };
