import { api } from "./api";

export interface Props {
  username: string;
  password: string;
}

const getUser = async (payload: Props) => {
  const res = await api().post<{ id: string; username: string }>(
    `${window.location.origin}/api/user/account`,
    payload
  );
  return res.data;
};
export default getUser;
