import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import type { Dragon } from "@/types/dragon";

type DragonState = {
  list: Dragon[];
  dragonDeleteId: string | null;
};

const initialState = {
  list: [],
  dragonDeleteId: null,
} as DragonState;

export const dragons = createSlice({
  name: "dragons",
  initialState,
  reducers: {
    reset: () => initialState,
    setList: (state, action: PayloadAction<Dragon[]>) => {
     state.list = action.payload as Dragon[];
    },
    setDragonDeleteId: (state, action: PayloadAction<string>) => {
      state.dragonDeleteId = action.payload;
    }
  },
});

export const {
  setList,
  setDragonDeleteId,
  reset,
} = dragons.actions;

export default dragons.reducer;
