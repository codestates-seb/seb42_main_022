import { useQuery } from "react-query";
// import { defaultInstance } from "../utils/api";
import axios from "axios";
interface postList {
  board_id: number;
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  created_at: string;
  member: {
    profile_url: string;
  };
}

export const usePosts = () => {
  const url =
    "http://3.39.150.26:8080/boards/free?searchType=CONTENTS&searchValue=&page=&size=";
  const fetchPosts = async () => {
    const response = await axios.get<postList[]>(url);
    return response.data;
  };

  return useQuery<postList[], Error>("posts", fetchPosts, {
    refetchOnWindowFocus: false,
  });
};
