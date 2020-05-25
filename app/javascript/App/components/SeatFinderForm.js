import React, { useState, useEffect } from "react";
import swal  from "sweetalert";
import styled from "styled-components";
import { Api } from "../Api";
import {
  Form,
  Input,
  Submit
} from "./Form";

const SeatFinderForm = (props) => {
  const [venue, setVenue] = useState(props.currentVenue);
  const [seatsRequested, setSeatsRequested] = useState("");

  useEffect(() => {
    setVenue(props.currentVenue);
  }, [props.currentVenue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      venueId: venue,
      seatsParams: {
        seats: {
          requested_count: seatsRequested,
        },
      },
    };

    Api
      .BestSeats
      .find(params)
      .then((response) => {
        const { data } = response;

        props.setSeats(data);
        props.selectSeatsByLabel(data);
      })
      .catch((response) => {
        swal(null, response.data, "error");
      });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e) } className="form">
      <label htmlFor="seats_requested">
        Seats Requested:
      </label>
      <Input
        type="text"
        name="seats_requested"
        id="seats_requested"
        value={seatsRequested}
        required="required"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => setSeatsRequested(e.target.value)}
        autoComplete="off"
      />
      <Submit type="submit" name="submit" value="Find!" />
    </Form>
  );
};

export { SeatFinderForm };

export default SeatFinderForm;
