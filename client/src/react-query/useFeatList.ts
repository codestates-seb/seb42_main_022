import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { defaultInstance } from "../utils/api";

interface FeatPost {
  title: string;
  board_id: number;
  like_count: number;
  view_count: number;
}

export const useFeatList = () => {
  const { category } = useParams();
  const fetchPost = async () => {
    let url = "";
    if (category === "community") {
      url = "/boards/rankFreeBoards";
    } else if (category === "review") {
      url = "/boards/rankEcoBoards";
    } else if (category === "greenact") {
      url = "/boards/rankGreenBoards";
    }
    const response = await defaultInstance.get<FeatPost[]>(url);
    return response.data;
  };

  return useQuery<FeatPost[], Error>("featpost", fetchPost, {
    refetchOnWindowFocus: false,
  });
};
