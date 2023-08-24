import * as uploadImages from "./Upload";
import * as getAllByProperty from "./GetByProperty";

export const ImagesProvider = {
  ...uploadImages,
  ...getAllByProperty,
};
