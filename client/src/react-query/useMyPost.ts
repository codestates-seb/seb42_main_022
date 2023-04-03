import { useQuery } from "react-query";
// import { defaultInstance } from "../utils/api";
import axios from "axios";
interface MyPost {
  title: string;
  contents: string;
  board_creator: string;
  creator_level: string;
  delegate_image_path: string;
  board_id: number;
  like_count: number;
  view_count: number;
  created_at: string;
  modified_at: string;
}

export const useMyPost = () => {
  const memberid = localStorage.memberid;
  const fetchPost = async () => {
    const url = `/boards/myBoards/${memberid}`;
    const response = await axios.get<MyPost[]>(url);
    return response.data;
  };

  return useQuery<MyPost[], Error>("MyPost", fetchPost, {
    refetchOnWindowFocus: false,
  });
};
