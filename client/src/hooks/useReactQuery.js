import { useQuery } from "react-query";
import axios from "axios";

// export type QueryResponse = {
//   [key: string]: string,
// };

const getStuff = async (key, searchQuery, page) => {
  const { data } = await axios.get(
    `https://fetchurl.com?query=${query}&page=${page}`
  );

  return data;
};

export default function useReactQuery(searchQuery, page) {
  return (
    useQuery < QueryResponse,
    Error >
      (["query", searchQuery, page],
      getStuff,
      {
        enabled: searchQuery, // If we have searchQuery, then enable the query on render
      })
  );
}
