import React from "react";
import styled from "styled-components";
import Seat from "./Seat";

const Row = styled.div`
  display: flex;
  margin: 0 auto;
  width: ${props => 70 * props.columns}px;
`;

const SeatRow = ({ seats, selectSeat, deselectSeat, selectedSeats }) => {
  const sortedSeats = seats.sort((a, b) => Number(a.column, 10) - Number(b.column, 10));

  return (
    <Row
      columns={seats.length}
    >
      {
        sortedSeats.map((seat, index) => (
          <Seat
            key={index}
            id={seat.id}
            label={seat.label}
            available={seat.available}
            selectSeat={selectSeat}
            isSelected={selectedSeats.includes(seat.id)}
            deselectSeat={deselectSeat}
          />
        ))
      }
    </Row>
  );
};

export { SeatRow };

export default SeatRow;
