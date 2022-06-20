import { configureStore } from "@reduxjs/toolkit";
import simulationReducer from "./features/simulation/simulationSlice";
import gridReducer from "./features/grid/gridSlice";

const store = configureStore({
  reducer: {
    simulation: simulationReducer,
    grid: gridReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
