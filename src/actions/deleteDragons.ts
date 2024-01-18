import dragonAPI from "@/services/dragonAPI";

// Redux
import { setList } from "@/redux/features/dragonsSlice";
import { store } from '@/redux/store'

const deleteDragon = (id: string) => async (dispatch: any) => {
  try {
    const dragonsList = store.getState().dragonsReducer.list; 
    await dragonAPI.delete(`/dragon/${id}`);

    // Update Dragon List
    const filterDragons = dragonsList.filter((dragon) => dragon.id !== id);
    dispatch(setList(filterDragons));
  }
  catch (error) {
    console.log("[deleteDragon] error => ", error);
  }
};

export default deleteDragon;
