import { wishList } from "../../db";
import { WishList } from "../../db/wish-list";
import { WishListItem } from "../../db/wish-list-item";

const getWishListById = async (
  userId: number,
  wishListId: number
): Promise<WishList | null> => {
  return wishList.findOne({
    where: { id: wishListId, userId: userId },
    include: { model: WishListItem, as: "items" },
  });
};

const getWishLists = async (userId: number): Promise<WishList[]> => {
  return wishList.findAll({
    where: { userId: userId },
    include: { model: WishListItem, as: "items" },
  });
};

export default { getWishListById, getWishLists };
