import {
  WishListItemResponseDTO,
  WishListItemRequestDTO,
} from "./wish-list-item";

export interface WishListResponseDTO {
  id: number;
  name: string;
  items?: WishListItemResponseDTO[];
}

export interface CreateWishListRequestDTO {
  name: string;
  items: WishListItemRequestDTO[];
}

export interface AddWishListItemRequestDTO {
  wishListId: number;
  item: WishListItemRequestDTO;
}

export interface UpdateWishListItemRequestDTO {
  wishListId: number;
  item: WishListItemRequestDTO;
}

export interface DeleteWishListItemRequestDTO {
  wishListId: number;
  wishListItemId: number;
}
