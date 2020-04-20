import ponies from "../../mock/data";

class Api {
  getPonies() {
    return new Promise((resolve) => {
      resolve(ponies);
    });
  }

  buyGoods() {
    return new Promise((resolve) => {
      resolve();
    });
  }
}

export default new Api();
