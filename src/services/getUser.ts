import { api } from "./api";
import { BasicResponse, SignedUserAccount } from "chain-db-ts";

export interface Props {
  username: string;
  password: string;
}

const getUser = async (payload: Props) => {
  const res = await api().post<BasicResponse<SignedUserAccount>>(
    `${window.location.origin}/api/user/account`,
    payload
  );
  return res.data;
};
export default getUser;
