import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchTopQuotes from "./components/top-quotes";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <FetchTopQuotes />
    </QueryClientProvider>
  );
};

export default App;