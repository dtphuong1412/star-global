import { wishList, wishListItem } from "../../db";

const createWishList = (name: string, items: any[], userId: number) => {
  return wishList.create(
    { name, items: items, userId, createdBy: userId },
    { include: "items" }
  );
};

const addWishListItem = (wishListId: number, name: string, userId: number) => {
  return wishListItem.create({ wishListId, name, createdBy: userId });
};

const updateWishListItem = (id: number, name: string, userId: number) => {
  return wishListItem.update({ name, updatedBy: userId }, { where: { id } });
};

const deleteWishListItem = (id: number) => {
  return wishListItem.destroy({ where: { id } });
};

export default {
  createWishList,
  addWishListItem,
  updateWishListItem,
  deleteWishListItem,
};
