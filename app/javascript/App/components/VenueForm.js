import React, { useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import { Api } from "../Api";
import {
  Form,
  Input,
  Submit,
} from "./Form";

const CustomForm = styled(Form)`
  margin-bottom: 30px;
`;

const VenueForm = (props) => {
  const [name, setName] = useState("");
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const venueParams = {
      venue: {
        rows: rows,
        columns: columns,
        name: name,
      },
    };

    Api
      .Venue
      .create(venueParams)
      .then((response) => {
        const { data: { venue } } = response;
        props.addVenue(venue);
        swal.close();
      })
      .catch((response) => {
        swal(null, response.data, "error");
      });
  };

  return (
    <CustomForm onSubmit={(e) => handleSubmit(e)} className="venue-form">
      <label htmlFor="name">
        Name
      </label>
      <Input
        type="text"
        name="name"
        id="name"
        value={name}
        required="required"
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <label htmlFor="rows">
        Rows
      </label>
      <Input
        type="text"
        name="rows"
        id="rows"
        value={rows}
        required="required"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => setRows(e.target.value)}
        autoComplete="off"
      />
      <label htmlFor="columns">
        Colums
      </label>
      <Input
        type="text"
        name="columns"
        id="columns"
        value={columns}
        required="required"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => setColumns(e.target.value)}
        autoComplete="off"
      />
      <Submit type="submit" name="submit" value="Create" />
    </CustomForm>
  );
};

export { VenueForm };

export default VenueForm;
