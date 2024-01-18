import dragonAPI from "@/services/dragonAPI";

// Store
import { setList } from "@/redux/features/dragonsSlice";

// Types
import type { Dragon } from "@/types/Dragon";

const getDragons = () => async (dispatch: any) => {
  try {
    const { data } = await dragonAPI.get<Dragon[]>(`/dragon`);
    dispatch(setList(data))
  }
  catch (error) {
    console.log("[getDragons] error => ", error)
  } 
};

export default getDragons;
