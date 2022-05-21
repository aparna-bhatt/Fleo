import { createSlice, current } from "@reduxjs/toolkit";
import getData from "../../api/getData";
const initialState = {
  zoomLevel: 1,
  data: {
    category: "Tata Steel",
    attributes: {
      level: 0,
      id: 1,
      total_sales: 100,
      target_sales: 200,
    },
  },
};

export const fleoSlice = createSlice({
  name: "fleo",
  initialState,
  reducers: {
    updateData: (store, action) => {
      const { id, level } = action.payload;
      const children = getData(id, level);
      const dfs = (curr, id, level) => {
        if (
          curr === undefined ||
          curr.attributes === undefined ||
          curr.attributes.level > level ||
          (curr.attributes.level === level && curr.attributes.id !== id)
        ) {
        } else if (
          curr.attributes.level === level &&
          curr.attributes.id === id
        ) {
          if (curr.children !== undefined) {
            curr.children = undefined;
          } else {
            curr.children = children;
          }
        } else {
          curr.children?.forEach((child) => {
            dfs(child, id, level);
          });
        }
      };
      dfs(store.data, action.payload.id, action.payload.level);
    },
    setZoomLevel: (store, action) => {
      store.zoomLevel = Math.max(0, store.zoomLevel + action.payload);
      console.log(current(store));
    },
  },
});

export const { updateData, setZoomLevel } = fleoSlice.actions;
export default fleoSlice.reducer;
