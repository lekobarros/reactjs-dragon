// Store
import { setList } from "@/redux/features/dragonsSlice";

// Types
import type { Dragon } from "@/types/Dragon";

// Types
const clearDragons = () => (dispatch: any) => {
  dispatch(setList([] as Dragon[]));
};

export default clearDragons;
