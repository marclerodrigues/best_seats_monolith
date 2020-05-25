import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Api } from "../Api";

const Container = styled.div`
  visibility: ${props => props.visible ? "visible" : "hidden"};
  display: flex;
  margin: 15px auto;
  width: ${props => 70 * props.columns}px;
  min-width: 100px;
`;

const Button = styled.div`
  font-weight: bold;
  padding: 12px 0;
  text-transform: uppercase;
  background-color: #4CAF50;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  float: right;
  min-width: 100px;
  text-align: center;
  width: 100%;
`;

const ButtonContent = styled.span`
  padding: 0 5px;
  font-size: 14px;
`;

const SeatPicker = ({ venueId, selectedSeats, columns, updateVenueSeats }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(selectedSeats.length > 0);
  }, [selectedSeats]);

  const handleClick = (e) => {
    const seatsParams = {
      seats: {
        ids: selectedSeats,
        available: false,
      },
    };

    Api
      .VenueSeats
      .pick(venueId, seatsParams)
      .then(() => {
        updateVenueSeats();
      });
  };

  return (
    <Container
      visible={visible}
      columns={columns}
    >
      <Button onClick={e => handleClick(e)} className="seat-picker-button">
        <ButtonContent>
          Pick Seats
        </ButtonContent>
      </Button>
    </Container>
  );
};

export { SeatPicker };

export default SeatPicker;
