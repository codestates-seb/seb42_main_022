import { atom } from "recoil";

interface postList {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  board_id: number;
  created_at: string;
}
interface SessionModel {
  /**
   * 로그인 유무
   */
  authenticated: boolean;
  /**
   * 토큰 값
   */
  token: string | null;
}

export const postListState = atom<postList[]>({
  key: "postListState",
  default: [],
});

export const areaState = atom<string>({
  key: "areaState",
  default: "seoul",
});

export const electricChargesState = atom<number>({
  key: "electricChargesState",
  default: 0,
});

export const totalUsageState = atom<number>({
  key: "totalUsageState",
  default: 0,
});

export const sessionState = atom<SessionModel>({
  key: "sessionState",
  default: {
    authenticated: false,
    token: null,
  },
});

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

export const memberInfoAtom = atom<MemberData | null>({
  key: "memberInfoAtom",
  default: null,
});
