import Api from "./Api";

export default {

    index(params) {
        return Api.get("/cars",params);
    },

    store(data) {
        return Api.post("/cars",data);
    },

    update(uuid,data) {
        return Api.put("/cars/"+uuid,data);
    },

    destroy(uuid) {
        return Api.delete("/cars/"+uuid);
    }
}