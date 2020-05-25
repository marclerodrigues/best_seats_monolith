import React from "react";
import { shallow } from "enzyme";
import { VenueForm } from "App/components/VenueForm";

describe("Components", () => {
  describe("<VenueForm />", () => {
    const setup = () => {
      const props = {
        addVenue: jest.fn(),
      };

      const wrapper = shallow(<VenueForm {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    describe("children", () => {
      it("renders the form correctly", () => {
        const form = wrapper.find(".venue-form");

        expect(form).toHaveLength(1);
      });

      it("renders the name label", () => {
        const name = wrapper.find('label[htmlFor="name"]');

        expect(name).toHaveLength(1);
      });

      it("renders the name input", () => {
        const name = wrapper.find("#name");

        expect(name).toHaveLength(1);
      });

      it("renders the rows label", () => {
        const rows = wrapper.find('label[htmlFor="rows"]');

        expect(rows).toHaveLength(1);
      });

      it("renders the rows input", () => {
        const rows = wrapper.find("#rows");

        expect(rows).toHaveLength(1);
      });

      it("renders the columns label", () => {
        const columns = wrapper.find('label[htmlFor="columns"]');

        expect(columns).toHaveLength(1);
      });

      it("renders the columns input", () => {
        const columns = wrapper.find("#columns");

        expect(columns).toHaveLength(1);
      });
    });
  });
});
