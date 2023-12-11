import { atom } from "jotai";

interface UserData {
  id: string;
  username: string;
}

export const user = atom<UserData>({
  id: "",
  username: "",
});

export const checkLogin = atom<Boolean>(false);
