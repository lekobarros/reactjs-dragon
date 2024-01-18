import dragonAPI from "@/services/dragonAPI";

  const getDragonById = async <Dragon>(id: string) => {
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
