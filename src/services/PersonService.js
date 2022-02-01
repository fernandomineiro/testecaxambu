import http from "../http-common";

const getAll = () => {
  return http.get("/pessoa");
};

const get = (id) => {
  return http.get(`/pessoa/${id}`);
};

const create = (data) => {
  return http.post("/pessoa", data);
};

const update = (id, data) => {
  return http.put(`/pessoa/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/pessoa/${id}`);
};

const PersonService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PersonService;
