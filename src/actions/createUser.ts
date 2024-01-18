// Store
import { addUser } from "@/redux/features/authSlice";

// Store
import { store } from "@/redux/provider";

// Types
import type { AuthUser } from "@/types/User";

const createUser = (user: AuthUser) => (dispatch: any) => {
  const userDatabase = store.getState().authReducer.userDatabase;

  return new Promise((resolve, reject) => {
    const findUser = userDatabase.find(({ username }) => username === user.username);

    if (!findUser) dispatch(addUser(user)), resolve("User created");
    else reject("User already exists")
  });
};

export default createUser;
