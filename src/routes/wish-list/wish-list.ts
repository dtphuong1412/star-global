import { NextFunction, Request, Response } from "express";
import express from "express";
import wishListService from "../../services/wish-list";
import DbException from "../../exceptions/dbException";
import { ErrorCode } from "../../types/error";
import { USER_ID_REQUEST_HEADER } from "../../utils/constants";
import { createWishListValidators } from "./validator";
import { body, validationResult } from "express-validator";

const router = express.Router();

// this is api for testing exception
router.get("/test123", (_req, _res, next) => {
  next(new DbException("something wrong", ErrorCode.DB_TIMEOUT_ERROR));
});

// get all own wish-lists
router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[USER_ID_REQUEST_HEADER];
  try {
    const data = await wishListService.getWishLists(Number(userId));
    res.json({ data });
  } catch (e) {
    next(
      new DbException("Something wrong from db", ErrorCode.DB_UNKNOWN_ERROR)
    );
  }
});

// get a specicifc wish-list
router.get(
  "/:wishListId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wishListId } = req.params;
    const userId = req.headers[USER_ID_REQUEST_HEADER];
    try {
      const data = await wishListService.getWishListById(
        Number(userId),
        Number(wishListId)
      );
      res.json({ data });
    } catch (e) {
      next(
        new DbException("Something wrong from db", ErrorCode.DB_UNKNOWN_ERROR)
      );
    }
  }
);

// create a new wish-list
router.post(
  "/",
  ...createWishListValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[USER_ID_REQUEST_HEADER];
    const { name, items } = req.body;
    try {
      const id = await wishListService.createWishList(
        name,
        items,
        Number(userId)
      );
      res.json({ id });
    } catch (e) {
      next(
        new DbException("Something wrong from db", ErrorCode.DB_UNKNOWN_ERROR)
      );
    }
  }
);

// add new item in wish-list
router.post(
  "/:wishListId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wishListId } = req.params;
    const { name } = req.body;
    const userId = req.headers[USER_ID_REQUEST_HEADER];
    try {
      const id = await wishListService.addWishListItem(
        Number(wishListId),
        name,
        Number(userId)
      );
      res.json({ id });
    } catch (e) {
      next(
        new DbException("Something wrong from db", ErrorCode.DB_UNKNOWN_ERROR)
      );
    }
  }
);

// update item in wish-list
router.put(
  "/wish-list-item/:wishListItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wishListItemId } = req.params;
    const userId = req.headers[USER_ID_REQUEST_HEADER];
    const { name } = req.body;
    try {
      const isSuccess = await wishListService.updateWishListItem(
        Number(wishListItemId),
        name,
        Number(userId)
      );
      res.json({ isSuccess });
    } catch (e) {
      next(
        new DbException("Something wrong from db", ErrorCode.DB_UNKNOWN_ERROR)
      );
    }
  }
);

// delete item in wish-list
router.delete(
  "/wish-list-item/:wishListItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wishListItemId } = req.params;
    try {
      const isSuccess = await wishListService.deleteWishListItem(
        Number(wishListItemId)
      );
      res.json({ isSuccess });
    } catch (e) {
      next(
        new DbException("Something wrong from db", ErrorCode.DB_UNKNOWN_ERROR)
      );
    }
  }
);

export default router;
