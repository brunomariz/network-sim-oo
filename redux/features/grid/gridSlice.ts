import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { networkFeatureCategories } from "../../../@types/networkFeatureCategories";
import Network from "../../../classes/Network";
import NetworkFeature from "../../../classes/NetworkFeature";
import { templateGenerator } from "../../../utils/templates";
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
  network: new Network(
    initialHeight,
    initialWidth,
    templateGenerator("icon", initialHeight, initialWidth)
  ),
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
      state.network = new Network(state.network.sizeX, state.network.sizeY);
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
      const newElements = templateGenerator(
        action.payload,
        state.network.sizeX,
        state.network.sizeY
      );
      state.network = new Network(
        state.network.sizeX,
        state.network.sizeY,
        newElements
      );
    },
    copyNetwork: (state) => {
      state.network = new Network(
        state.network.sizeX,
        state.network.sizeY,
        state.network.elements
      );
    },
  },
});

export const {
  setElements,
  clearElements,
  setCursorElement,
  tick,
  resetNetwork,
  copyNetwork,
} = gridSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNetwork = (state: RootState) => state.grid.network;

export default gridSlice.reducer;
