import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { networkFeatureCategories } from "../../../@types/networkFeatureCategories";
import Network from "../../../classes/Network";
import NetworkFeature from "../../../classes/NetworkFeature";
import type { RootState } from "../../store";

// Define a type for the slice state
interface GridState {
  network: Network;
  cursorElement: networkFeatureCategories;
}

// Define the initial state using that type
const initialWidth = 60;
const initialHeight = 30;
const initialState: GridState = {
  network: new Network(initialHeight, initialWidth, undefined, "stripes"),
  cursorElement: networkFeatureCategories.TwistedPair,
};

export const gridSlice = createSlice({
  name: "grid",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<NetworkFeature[][]>) => {
      state.network.elements = action.payload;
    },
    clearElements: (state) => {
      state.network = new Network(
        state.network.sizeX,
        state.network.sizeY,
        undefined,
        "empty"
      );
    },
    setCursorElement: (
      state,
      action: PayloadAction<networkFeatureCategories>
    ) => {
      state.cursorElement = action.payload;
    },
    tick: (state) => {
      state.network = state.network.tick();
    },
    resetNetwork: (state, action: PayloadAction<NetworkTemplate>) => {
      new Network(
        state.network.sizeX,
        state.network.sizeY,
        undefined,
        action.payload
      );
    },
  },
});

export const { setElements, clearElements, setCursorElement, tick } =
  gridSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNetwork = (state: RootState) => state.grid.network;

export default gridSlice.reducer;
