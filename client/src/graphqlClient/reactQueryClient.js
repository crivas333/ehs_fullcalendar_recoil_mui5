import { QueryClient } from "react-query";

//export const queryClient = new QueryClient();
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
