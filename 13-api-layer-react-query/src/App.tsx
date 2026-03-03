import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchTopQuotes from "./components/top-quotes";
import { ToastContainer } from "react-toastify";
import UpdateQuotes from "./components/update-quotes";
import PaginatedQuotes from "./components/paginated-quotes";
import InfiniteScrollQuotes from "./components/infinite-scroll-quotes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UpdateQuotes />
      <ToastContainer />
      {/* <FetchTopQuotes /> */}
      {/* <PaginatedQuotes /> */}
      <InfiniteScrollQuotes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;