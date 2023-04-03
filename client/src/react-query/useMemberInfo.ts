import { useQuery } from "react-query";
import { defaultInstance } from "../utils/api";
interface MemberData {
  email: string;
  name: string;
  phone: string;
  point: string;
  tree_count: string;
  level_dto: {
    user_name: string;
    level: number;
    level_exp: number;
    total_exp: number;
  };
  member_id: number;
  member_status: string;
  profile_url: string;
}

export const useMemberInfo = () => {
  const id = localStorage.memberid;
  const url = `/members/${id}`;

  const fetchPost = async () => {
    const response = await defaultInstance.get<MemberData>(url);
    return response.data;
  };

  return useQuery<MemberData, Error>("member", fetchPost, {
    refetchOnWindowFocus: false,
  });
};
