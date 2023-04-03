import { atom } from "recoil";

export interface MemberData {
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

export const memberInfoAtom = atom<MemberData | null>({
  key: "memberInfoAtom",
  default: null,
});
