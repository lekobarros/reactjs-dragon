import dragonAPI from "@/services/dragonAPI";

// Types
import type { Dragon } from "@/types/dragon";

const updateDragonById = async (dragon: Dragon) => {
  try {
    const { id, name, histories, type } = dragon;
    const data = { name, histories, type } as Dragon;

    await dragonAPI.put(`/dragon/${id}`, data);
  } catch (error) {
    console.log("[updateDragonById] error => ", error);
  }
};

export default updateDragonById;
