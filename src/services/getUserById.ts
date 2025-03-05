import { api } from "./api";

export interface Props {
  userId: string;
}

const getUserById = async (payload: Props) => {
  const res = await api().post<{ id: string; username: string }>(
    `${window.location.origin}/api/user/${payload.userId}`,
    payload
  );
  return res.data;
};
export default getUserById;
