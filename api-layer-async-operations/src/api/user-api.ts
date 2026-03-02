import type { User } from "../types/user";
import api from "./api";

const URLS = {
  fetchUsersUrl: "users",
};

export const fetchUsers = () => {
  return api.get<User[]>(URLS.fetchUsersUrl, {
    baseURL: "https://jsonplaceholder.typicode.com/",
  });
};