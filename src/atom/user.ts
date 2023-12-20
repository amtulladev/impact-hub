import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

interface UserData {
  id: string;
  username: string;
}

const initialValue: UserData = {
  id: "",
  username: "",
};
export const userAtom = atomWithStorage("userDetails", initialValue, storage);

export const checkLoginAtom = atomWithStorage("auth", false, storage);
