import axios from "axios";
import { useQuery } from "react-query";

interface postList {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  board_id: number;
  created_at: string;
}

export const useEcoPosts = () => {
  const fetchPosts = async () => {
    const response = await axios.get<postList[]>(
      "http://3.39.150.26:8080/boards/eco?searchType=CONTENTS&searchValue=&page=&size=",
    );
    return response.data;
  };

  return useQuery<postList[], Error>("posts", fetchPosts);
};
