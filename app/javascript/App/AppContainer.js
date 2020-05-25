import React, { useState } from "react";
import styled from "styled-components";
import {
  VenuesContainer,
} from "./components";

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const AppContainer = () => {
  const [currentVenue, setCurrentVenue] = useState("");

  return (
    <Container>
      <VenuesContainer
        setCurrentVenue={setCurrentVenue}
        currentVenue={currentVenue}
      />
    </Container>
  );
};

export { AppContainer };

export default AppContainer;
