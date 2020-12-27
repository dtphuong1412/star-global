import wishListQueries from "../repositories/wish-list/queries";
import wishListActions from "../repositories/wish-list/actions";
import { WishListResponseDTO } from "../types/wish-list";
import _ from "lodash";
import { WishListItemRequestDTO } from "../types/wish-list-item";

const getWishListById = async (
  userId: number,
  wishListId: number
): Promise<WishListResponseDTO | null> => {
  const wishList = await wishListQueries.getWishListById(userId, wishListId);
  if (wishList) {
    return {
      id: wishList.getDataValue("id"),
      name: wishList.getDataValue("name"),
      items: _.map(wishList.getDataValue("items"), (item: any) => {
        return {
          id: item.id,
          name: item.name,
        };
      }),
    };
  }
  return null;
};

const getWishLists = async (userId: number): Promise<WishListResponseDTO[]> => {
  const wishLists = await wishListQueries.getWishLists(userId);
  if (wishLists && wishLists.length > 0) {
    const data = _.map(
      wishLists,
      (wishList): WishListResponseDTO => {
        return {
          id: wishList.getDataValue("id"),
          name: wishList.getDataValue("name"),
          items: _.map(wishList.getDataValue("items"), (item: any) => {
            return {
              id: item.id,
              name: item.name,
            };
          }),
        };
      }
    );
    return data;
  }
  return [];
};

const createWishList = async (
  name: string,
  items: WishListItemRequestDTO[],
  userId: number
): Promise<number | undefined> => {
  const data = await wishListActions.createWishList(
    name,
    items.map((item) => {
      return { ...item, createdBy: userId };
    }),
    userId
  );
  if (data) {
    return Number(data.getDataValue("id"));
  }
  return undefined;
};

const addWishListItem = async (
  wishListId: number,
  name: string,
  userId: number
): Promise<number | undefined> => {
  const data = await wishListActions.addWishListItem(wishListId, name, userId);
  if (data) {
    return Number(data.getDataValue("id"));
  }
  return undefined;
};

const updateWishListItem = async (
  id: number,
  name: string,
  userId: number
): Promise<boolean> => {
  const [numberOfUpdated] = await wishListActions.updateWishListItem(
    id,
    name,
    userId
  );
  return numberOfUpdated === 1;
};

const deleteWishListItem = async (id: number): Promise<boolean> => {
  const numberOfDeleted = await wishListActions.deleteWishListItem(id);
  return numberOfDeleted === 1;
};

export default {
  getWishListById,
  getWishLists,
  createWishList,
  addWishListItem,
  updateWishListItem,
  deleteWishListItem,
};
