import { configureStore } from "@reduxjs/toolkit";
import entities from "./entities";

const store = configureStore({
  reducer: {
    entities,
  },
});

export default store;
