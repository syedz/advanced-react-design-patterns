import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUsers } from "../api/user-api";
import { withAsync } from "../helpers/with-async";
import { API_STATUS } from "../constants/api-status";
import { useApiStatus } from "../api/hooks/use-api-status";
import type { User } from "../types/user";
import LazyLoader from "./lazy-loader";

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { 
    setStatus, 
    isPending, 
    isError, 
    isSuccess 
  } = useApiStatus(API_STATUS.IDLE);

  const initFetchUsers = async () => {
    setStatus(API_STATUS.PENDING);
    const { response, error } = await withAsync(fetchUsers);

    if (error) {
      setStatus(API_STATUS.ERROR);
    } else if (response) {
      setUsers(response.data);
      setStatus(API_STATUS.SUCCESS);
    }
  };

  return { users, isPending, isError, isSuccess, initFetchUsers };
};

const Users: React.FC = () => {
  const { users, isPending, isError, isSuccess, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, []);

  return (
    <Container>
      <FetchButton onClick={initFetchUsers}>
         {/* If request < 500ms, user only sees "Fetch Users" */}
         <LazyLoader 
          show={isPending} 
          delay={500} 
          defaultContent="Fetch Users" 
        />
      </FetchButton>

      {isSuccess && (
        <FlexContainer>
          {users.map((user) => (
            <ContentContainer key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </ContentContainer>
          ))}
        </FlexContainer>
      )}

      {isError && <ErrorMessage>Failed to load users.</ErrorMessage>}
    </Container>
  );
};

// Styles
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const UserName = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const UserEmail = styled.p`
  color: #666;
`;

const FetchButton = styled.button`
  background: #0053b3;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

export default Users;