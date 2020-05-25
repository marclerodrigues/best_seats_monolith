import React from "react";
import { shallow } from "enzyme";
import { VenueList } from "App/components/VenueList";

describe("Components", () => {
  describe("<VenueList />", () => {
    const setup = () => {
      const props = {
        setCurrentVenue: jest.fn(),
        removeVenue: jest.fn(),
        venues: [],
      };

      const wrapper = shallow(<VenueList {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    describe("children", () => {
      it("renders the select field correctly", () => {
        const select = wrapper.find(".venue-select-list");

        expect(select).toHaveLength(1);
      });

      it("renders the new venue button correctly", () => {
        const button = wrapper.find("#new-venue-button");

        expect(button).toHaveLength(1);
      });
    });
  });
});
