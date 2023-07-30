import * as create from "./Create";
import * as getAllFromProperty from "./GetAllFromProperty";
import * as updateById from "./UpdateById";
import * as getAllFromUser from "./GetAllFromUser";
import * as deleteById from "./DeleteById";

export const ReviewController = {
  ...create,
  ...getAllFromProperty,
  ...updateById,
  ...getAllFromUser,
  ...deleteById,
};
