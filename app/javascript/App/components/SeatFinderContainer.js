import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import styled from "styled-components";
import SeatFinderForm from "./SeatFinderForm";

const Container = styled.div`
  width: 205px;
  margin: 0 auto 15px;
  text-align: center;
  border: 2px solid #ACBDBA;
  padding: 10px 10px 15px;
  border-radius: 5px;
`;

const SeatFinderContainer = (props) => {
  const [seats, setSeats] = useState([]);
  const [notAvailableSeats, setNotAvailableSeats] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showErrorMessage && seats.length === 0) {
      setNotAvailableSeats(true);

      swal({
        text: "Sorry, we couldn't find seats available at this venue.",
        icon: "error"
      });
    }
  }, [seats]);

  useEffect(() => {
      setNotAvailableSeats(false);
      setShowErrorMessage(true);
  }, [props.currentVenue]);

  return (
    <Container>
      <p>
        Find the best seats!
      </p>
      <SeatFinderForm
        setSeats={setSeats}
        currentVenue={props.currentVenue}
        selectSeatsByLabel={props.selectSeatsByLabel}
      />
    </Container>
  );
};

export { SeatFinderContainer };

export default SeatFinderContainer;
