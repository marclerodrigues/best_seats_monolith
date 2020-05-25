import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uniq } from "lodash";
import VenueList from "./VenueList";
import VenueSeatsList from "./VenueSeatsList";
import SeatPicker from "./SeatPicker";
import { Api } from "../Api";

const VenuesContainer = (props) => {
  const [venues, setVenues] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [columns, setColumns] = useState(0);
  const [fetchSeats, setFetchSeats] = useState(false);

  useEffect(() => {
    Api
      .Venue
      .listAll()
      .then((response) => {
        const { data } = response;

        setVenues(data);
      })
      .catch((response) => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    const venue = venues.find((v) => v.id === props.currentVenue);
    const venueColumns = venue ? venue.columns : 0;

    setSelectedSeats([]);
    setColumns(venueColumns);
  }, [props.currentVenue]);

  const addVenue = (venue) => {
    const newVenues = venues.concat(venue);

    setVenues(newVenues);
  };

  const removeVenue = (venueId) => {
    const newVenues = venues.filter(venue => venue.id !== venueId);

    setFetchSeats(!fetchSeats);
    setSelectedSeats([]);
    setVenues(newVenues);
  };

  const selectSeat = (seatId) => {
    const seats = uniq(selectedSeats.concat(seatId));

    setSelectedSeats(seats);
  };

  const deselectSeat = (seatId) => {
    const seats = selectedSeats.filter((seat) => seat !== seatId);

    setSelectedSeats(seats);
  };

  const updateVenueSeats = () => {
    setFetchSeats(!fetchSeats);
    setSelectedSeats([]);
  };

  return (
    <div>
      <VenueList
        venues={venues}
        removeVenue={removeVenue}
        setCurrentVenue={props.setCurrentVenue}
        addVenue={addVenue}
      />
      <VenueSeatsList
        currentVenue={props.currentVenue}
        selectSeat={selectSeat}
        deselectSeat={deselectSeat}
        fetchSeats={fetchSeats}
        setSelectedSeats={setSelectedSeats}
        selectedSeats={selectedSeats}
      />
      <SeatPicker
        selectedSeats={selectedSeats}
        columns={columns}
        venueId={props.currentVenue}
        updateVenueSeats={updateVenueSeats}
      />
    </div>
  );
};

export { VenuesContainer };

export default VenuesContainer;
