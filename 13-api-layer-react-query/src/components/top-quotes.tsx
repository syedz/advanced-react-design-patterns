import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchTopQuotes } from "../api/quote-api";
import type { Quote } from "../types/quotes";

// Styled Components
const Container = styled.div`
  padding-top: 8px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
`;

const QuotesContainer = styled.div`
  overflow-y: auto;
`;

const QuoteBlock = styled.blockquote`
  padding: 1rem;
  margin-bottom: 1rem;
  font-style: italic;
  border-left: 4px solid #d1d5db;
  background-color: #f3f4f6;
  color: #6b7280;
`;

const AuthorName = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
`;

const FetchTopQuotes: React.FC = () => {
  const {
    data: quotes,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Quote[]>({
    queryKey: ["top-quotes"],
    queryFn: fetchTopQuotes,
  });

  return (
    <Container>
      <Title>Top Quotes</Title>
      {isError && <ErrorMessage>Problem fetching quotes</ErrorMessage>}
      {isLoading && <p>Fetching quotes...</p>}
      {isSuccess && (
        <QuotesContainer>
          {quotes?.map((quote) => (
            <QuoteBlock key={quote.id}>
              <p>"{quote.quote}"</p>
              <AuthorName>- {quote.author}</AuthorName>
            </QuoteBlock>
          ))}
        </QuotesContainer>
      )}
    </Container>
  );
};

export default FetchTopQuotes;