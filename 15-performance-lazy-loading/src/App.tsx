import React, { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LazyLoader from "./components/lazy-loader";

// Lazy-loaded components
const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/about"));
const Contact = lazy(() => import("./components/contact"));

const App: React.FC = () => {
  return (
    <AppContainer>
      <Heading>Advanced React - Code Splitting</Heading>
      <NavContainer>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Nav>
      </NavContainer>

      <Suspense fallback={<LazyLoader show delay={500} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
};

export default App;

// Styled Components
const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  margin-top: 8rem;
`;

const Heading = styled.h1`
  font-weight: 600;
  font-size: 2rem;
`;

const NavContainer = styled.div`
  margin-top: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;