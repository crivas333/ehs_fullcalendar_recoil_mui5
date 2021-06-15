// import { ReactQueryDevtools } from "react-query-devtools";
import useDebounce from "../../hooks/useDebounce";
import useReactQuery from "../../hooks/useReactQuery";

export const Container = ({ searchQuery, isFetchingCallback }) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const { status, data, error, isFetching } = useReactQuery(
    debouncedSearchQuery,
    page
  );

  React.useEffect(
    () => isFetchingCallback(isFetching),
    [isFetching, isFetchingCallback]
  );

  return (
    <>
      {data}
      {/* <ReactQueryDevtools /> */}
    </>
  );
};
