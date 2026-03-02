import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchTopQuotes from "./components/top-quotes";
import { ToastContainer } from "react-toastify";
import UpdateQuotes from "./components/update-quotes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UpdateQuotes />
      <ToastContainer />
      <FetchTopQuotes />
    </QueryClientProvider>
  );
};

export default App;