import { Sequelize } from "sequelize";
import WishList from "./wish-list";
import WishListItem from "./wish-list-item";
import _ from "lodash";
import { SCHEMA } from "../utils/constants";

const sequelize = new Sequelize("postgres", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  hooks: {
    beforeSave: (instance, _options) => {
      instance.setDataValue("createdAt", new Date().toISOString());
      if (instance.getDataValue("id")) {
        instance.setDataValue("updatedAt", new Date().toISOString());
      }
    },
  },
  define: {
    timestamps: false,
  },
  timezone: "+00:00",
  dialectOptions: {
    options: {
      useUTC: false,
    },
  },
});

const wishList = WishList.init(sequelize);
const wishListItem = WishListItem.init(sequelize);
wishList.hasMany(wishListItem, {
  sourceKey: "id",
  foreignKey: "wishListId",
  as: "items",
});

const createSchema = async () => {
  const schemas = await sequelize.showAllSchemas({});
  const schema = _.find(schemas, (schemaValue: string) => {
    return schemaValue === SCHEMA;
  });
  if (!schema) {
    await sequelize.createSchema(SCHEMA, {});
    await sequelize.sync({ schema: SCHEMA });
  }
};
createSchema();

export { sequelize, wishList, wishListItem };
