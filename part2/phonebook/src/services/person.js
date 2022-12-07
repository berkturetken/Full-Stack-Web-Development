import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

// GET
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// POST
const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

// PUT
const updatePhoneNumber = (personId, newPerson) => {
  const request = axios.put(`${baseUrl}/${personId}`, newPerson);
  return request.then((response) => response.data);
};

// DELETE
const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response.data);
};

export default { getAll, create, updatePhoneNumber, deletePerson };
