import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchQuotesByPage } from "../api/quote-api";
import type { QuoteResponse } from "../types/quotes";

const PaginatedQuotes: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<QuoteResponse, Error>({
    queryKey: ["quotes", page],
    queryFn: () => fetchQuotesByPage(page),
  });

  return (
    <Container>
      <Title>Quotes Gallery</Title>
      
      {isError && <ErrorMessage>Error fetching quotes.</ErrorMessage>}
      
      {isLoading && <p>Loading initial batch...</p>}

      {isSuccess && (
        <QuotesWrapper>
          <QuotesContainer>
            {data.quotes.map((quote) => (
              <QuoteBlock key={quote.id}>
                <p>"{quote.quote}"</p>
                <Author>- {quote.author}</Author>
              </QuoteBlock>
            ))}
          </QuotesContainer>

          <PaginationControls>
            {isFetching && <LoadingIndicator>Updating...</LoadingIndicator>}
            
            <NavGroup>
              <Button 
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              
              <PageLabel>Page {page}</PageLabel>
              
              <Button
                onClick={() => {
                  if (data?.hasMore) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={!data?.hasMore}
              >
                Next
              </Button>
            </NavGroup>
          </PaginationControls>
        </QuotesWrapper>
      )}
    </Container>
  );
};

export default PaginatedQuotes;

// Styles
const Container = styled.div`max-width: 800px; margin: auto; padding: 2rem;`;
const Title = styled.h2`font-size: 2rem; margin-bottom: 1.5rem;`;
const QuotesWrapper = styled.div`display: flex; flex-direction: column; gap: 1rem;`;
const QuotesContainer = styled.div`min-height: 400px;`;
const QuoteBlock = styled.blockquote`padding: 1rem; border-left: 5px solid #4299e1; margin-bottom: 1rem;`;
const Author = styled.cite`display: block; margin-top: 0.5rem; font-weight: bold; font-style: normal;`;
const PaginationControls = styled.div`display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-top: 2rem;`;
const NavGroup = styled.div`display: flex; align-items: center; gap: 1rem;`;
const Button = styled.button`padding: 0.5rem 1.5rem; cursor: pointer; &:disabled { cursor: not-allowed; opacity: 0.5; }`;
const PageLabel = styled.span`font-weight: bold;`;
const LoadingIndicator = styled.span`font-size: 0.8rem; color: #4299e1;`;
const ErrorMessage = styled.p`color: red;`;