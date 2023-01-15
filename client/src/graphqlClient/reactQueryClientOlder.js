//import { QueryClient } from "react-query";
import { QueryClient } from "react-query";

//export const queryClient = new QueryClient();
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

// export const TSqueryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//     },
//   },
// });
