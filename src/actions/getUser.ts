// Store
import { setAuthUser } from "@/redux/features/authSlice";

// Store
import { store } from "@/redux/store";

// Types
import type { AuthUser } from "@/types/User";

const getUser = (user: AuthUser) => (dispatch: any) => {
  const userDatabase = store.getState().auth.userDatabase;

  return new Promise((resolve, reject) => {
    const findUser = userDatabase.find(({ username, password }) => username === user.username && password === user.password);

    if (findUser) dispatch(setAuthUser(user)), resolve("User created");
    else reject("User not found")
  });
};

export default getUser;
