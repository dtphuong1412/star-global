import { body } from "express-validator";
import validationMiddleware from "../validator-middleware";
import _ from "lodash";

export const createWishListValidators = [
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("items").custom((value) => {
      if (Array.isArray(value)) {
        if (value.find((o) => _.isEmpty(o.name))) {
          return Promise.reject("name in items is required");
        }
        return true;
      }
      return Promise.reject("items must be an array");
    }),
  ],
  validationMiddleware,
];
