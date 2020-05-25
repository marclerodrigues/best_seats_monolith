import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const backgroundColor = (available, selected) => {
  if (available && selected) {
    return "#F7DBA7";
  } else if (available && !selected) {
    return "#1D7874";
  } else if (!available && !selected) {
    return "#ACBDBA";
  }
};

const SeatContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.backgroundColor};
  margin: 10px;
  padding: 10px 10px 0;
  text-align: center;
  color: ${props => props.selected ? "gray" : "white"};
  font-weight: bold;
  cursor: ${props => props.available ? "pointer" : "inherit"};

  &:hover {
    background-color: ${props => props.available && !props.selected ? "#679289" : props.backgroundColor };
    color: white;
  }
`;

const Seat = ({
  id,
  label,
  available,
  isSelected,
  selectSeat,
  deselectSeat,
}) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [id, available, isSelected]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!available) {
      return;
    }

    const newValue = !selected;

    setSelected(newValue);

    if (newValue) {
      selectSeat(id);
    } else {
      deselectSeat(id);
    }
  };

  return (
    <SeatContainer
      available={available}
      selected={selected}
      onClick={(e) => handleClick(e)}
      backgroundColor={backgroundColor(available, selected)}
    >
      {label.toUpperCase()}
    </SeatContainer>
  );
};

export { Seat };

export default Seat;
