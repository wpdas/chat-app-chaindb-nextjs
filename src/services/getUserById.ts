import { api } from "./api";
import { BasicResponse, SignedUserAccount } from "chain-db-ts";

export interface Props {
  userId: string;
}

const getUserById = async (payload: Props) => {
  const res = await api().post<BasicResponse<SignedUserAccount>>(
    `${window.location.origin}/api/user/${payload.userId}`,
    payload
  );
  return res.data;
};
export default getUserById;
