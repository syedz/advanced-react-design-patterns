import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchQuotesByCursor } from "../api/quote-api";
import type { InfiniteQuoteResponse } from "../types/quotes";

const InfiniteScrollQuotes: React.FC = () => {
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<InfiniteQuoteResponse, Error>({
    queryKey: ["quotes-infinite"],
    queryFn: ({ pageParam = 0 }) => fetchQuotesByCursor(pageParam as number),
    getNextPageParam: (lastPage: InfiniteQuoteResponse) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Container>
      <Title>Infinite Scroll Quotes</Title>

      {isError && <ErrorMessage>Problem fetching quotes.</ErrorMessage>}
      {isLoading && <p>Initial load...</p>}

      {isSuccess && (
        <QuotesContainer>
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.quotes.map((quote) => (
                <QuoteBlock key={quote.id}>
                  <p>"{quote.quote}"</p>
                  <Author>- {quote.author}</Author>
                </QuoteBlock>
              ))}
            </React.Fragment>
          ))}
          
          {/* Intersection Observer target */}
          <div ref={loadMoreRef} style={{ height: "20px" }} />
          
          {isFetchingNextPage && <LoadingIndicator>Loading more...</LoadingIndicator>}
        </QuotesContainer>
      )}
    </Container>
  );
};

export default InfiniteScrollQuotes;

const Container = styled.div`max-width: 800px; margin: auto; padding: 2rem;`;
const Title = styled.h2`font-size: 2rem; margin-bottom: 1.5rem;`;
const QuotesContainer = styled.div`display: flex; flex-direction: column; gap: 1rem;`;
const QuoteBlock = styled.blockquote`background: #f3f4f6; padding: 1.5rem; border-left: 5px solid #718096; color: #4a5568;`;
const Author = styled.cite`display: block; margin-top: 1rem; font-weight: bold; font-style: normal;`;
const LoadingIndicator = styled.p`text-align: center; color: #4299e1; font-weight: bold;`;
const ErrorMessage = styled.p`color: #c53030;`;