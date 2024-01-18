import dragonAPI from "@/services/dragonAPI";

// Types
import type { Dragon } from "@/types/dragon";

const createDragon = async (dragon: Dragon) => {
  try {
    await dragonAPI.post(`/dragon`, dragon);
  } catch (error) {
    console.log("[createDragon] error => ", error);
  }
};

export default createDragon;
