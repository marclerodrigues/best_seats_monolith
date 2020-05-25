import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { groupBy } from "lodash";
import SeatRow from "./SeatRow";
import SeatFinderContainer from "./SeatFinderContainer";
import { Api } from "../Api";

const StageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: ${props => 70 * props.columns}px;
  min-width: 100px;
  max-width: 100%;
  padding: 10px;
  background-color: #1D7874;
  text-align: center;
  color: white;
  font-weight: bold;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const StageContent = styled.span`
  width: 100%;
`;

const VenueSeatsList = (props) => {
  const [seats, setSeats] = useState([]);
  const [groupedSeats, setGroupedSeats] = useState(props.groupedSeats || []);
  const [columns, setColumns] = useState(0);
  const selectSeatsByLabel = (labels) => {
    const seatsToSelect = seats.filter((s) => labels.includes(s.label));
    props.setSelectedSeats(seatsToSelect.map((seat) => seat.id));
  };

  useEffect(() => {
    if (props.currentVenue) {
      Api
        .VenueSeats
        .listAll(props.currentVenue)
        .then((response) => {
          const { data } = response;
          const grouped = groupBy(data, 'row');
          const keys = Object.keys(grouped).sort();
          const sortedGroups = keys.map((key) => {
            return grouped[key];
          });

          setSeats(data);
          setGroupedSeats(sortedGroups);
          setColumns(sortedGroups.length);
        })
    }
  }, [props.currentVenue, props.fetchSeats]);

  return (
    <div>
      {
        groupedSeats.length > 0 &&
          <div>
            <SeatFinderContainer
              currentVenue={props.currentVenue}
              selectSeatsByLabel={selectSeatsByLabel}
            />
            <StageContainer
              columns={columns}
            >
              <StageContent
                className="state-content"
              >
                STAGE
              </StageContent>
            </StageContainer>
          </div>
      }
      {
        groupedSeats.map((row, index) => (
          <SeatRow
            key={index}
            seats={row}
            selectSeat={props.selectSeat}
            deselectSeat={props.deselectSeat}
            selectedSeats={props.selectedSeats}
          />
        ))
      }
    </div>
  );
};

export { VenueSeatsList };

export default VenueSeatsList;
