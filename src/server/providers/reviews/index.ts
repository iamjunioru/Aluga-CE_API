import * as create from "./Create";
import * as getAllFromProperty from "./GetAllFromProperty";
import * as VerifyPropertyExist from "./VerifyPropertyExist";
// import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

export const ReviewsProvider = {
  ...create,
  ...getAllFromProperty,
  ...VerifyPropertyExist,
  // ...updateById,
  ...deleteById,
};
