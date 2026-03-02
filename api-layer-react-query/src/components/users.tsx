import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchUsers } from "../api/user-api";
import { useApi } from "../api/hooks/use-api";
import LazyLoader from "./lazy-loader";
import type { User } from "../types/user";

const useFetchUsers = () => {
  const {
    data: users,
    exec: initFetchUsers,
    isPending,
    isSuccess,
    // ...other statuses available if needed
  } = useApi<User[]>(() => fetchUsers().then((res) => res.data));

  return {
    users,
    initFetchUsers,
    isPending,
    isSuccess,
  };
};

const Users: React.FC = () => {
  const { 
    users, 
    initFetchUsers,
    isPending,
    isSuccess,
  } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, []);

  return (
    <Container>
      <FetchButton onClick={() => initFetchUsers()}>
        <LazyLoader
          show={isPending}
          delay={500}
          defaultContent="Fetch Users"
        />
      </FetchButton>

      {isSuccess && users && (
        <FlexContainer>
          {users.map((user) => (
            <ContentContainer key={user.id}>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </ContentContainer>
          ))}
        </FlexContainer>
      )}
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

export default Users;