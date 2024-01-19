import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Datas
import { mockAuthUserList } from "@/data/User";

// Types
import type { AuthUser } from "@/types/User";

type AuthState = {
  authUser: AuthUser | null;
  userDatabase: AuthUser[];
};

const initialState = {
  authUser: null,
  userDatabase: mockAuthUserList
} as AuthState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<AuthUser>) => {
      state.userDatabase = [...state.userDatabase, action.payload];
    },
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.authUser = action.payload;
    },
    reset: () => initialState,
  },
});

export const { addUser, setAuthUser, reset } = auth.actions;

export default auth.reducer;
