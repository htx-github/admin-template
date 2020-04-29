import * as app from "./app";
import * as date from "./date";
import * as math from "./math";

export default Vue => {
  const filters = {
    ...app,
    ...date,
    ...math
  };

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
};
