import { api } from "./api";

export interface Props {
  username: string;
  password: string;
}

const newUser = async (payload: Props) => {
  const res = await api().post<{
    id: string;
    username: string;
    message?: string;
  }>(`${window.location.origin}/api/user/new`, payload);
  return res.data;
};
export default newUser;
