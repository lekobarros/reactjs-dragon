import dragonAPI from "@/services/dragonAPI";

// Types
import type { Dragon } from "@/types/Dragon";

const getDragonById = async (id: string) => {
  return new Promise((resolve, reject) => {
    return dragonAPI
      .get<Dragon>(`/dragon/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getDragonById;
