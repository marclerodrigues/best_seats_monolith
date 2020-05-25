import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import swal from 'sweetalert';
import VenueForm from "./VenueForm";
import { SelectField } from "./Form";
import { Api } from "../Api";

const Container = styled.div`
  padding: 20px 0;
`;

const NewVenue = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  width: 25%;
  text-align: center;

  &:hover {
    background-color: #559e58;
  }
`;

const VenueList = (props) => {
  const setCurrentVenue = (e) => {
    e.preventDefault();

    props.setCurrentVenue(e.target.value);
  };

  const triggerModal = () => {
    const wrapper = document.createElement('div');
    ReactDOM.render(<VenueForm
      addVenue={props.addVenue}
    />, wrapper);
    const el = wrapper.firstChild;

    swal({
      title: "New Venue",
      content: el,
      buttons: false,
    });
  }

  return (
    <Container>
      <SelectField
        onChange={(e) => setCurrentVenue(e)}
        defaultValue=""
        className="venue-select-list"
      >
        <option disabled value="">
          Select a venue
        </option>
        {
          props.venues.map((venue, index) => (
            <option
              key={index}
              value={venue.id}
            >
              {venue.name}
            </option>
          ))
        }
      </SelectField>
      <NewVenue
        onClick={(e) => triggerModal()}
        id="new-venue-button"
      >
        Create New Venue
      </NewVenue>
    </Container>
  );
};

VenueList.defaultProps = {
  venues: [],
};

export { VenueList };

export default VenueList;
