import { Sequelize, DataTypes, Model } from "sequelize";
import { ModelName, SCHEMA, TableName } from "../utils/constants";

export class WishListItem extends Model {}

const init = (sequelize: Sequelize) => {
  WishListItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "Id",
      },
      wishListId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: TableName.WishList, key: "Id" },
        field: "WishListId",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "Name",
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
      modelName: ModelName.WishListItem,
      schema: SCHEMA,
      tableName: TableName.WishListItem,
      timestamps: false,
    }
  );
  return WishListItem;
};

export default { init };
