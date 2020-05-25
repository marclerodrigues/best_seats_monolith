import React from "react";
import { shallow } from "enzyme";
import { VenuesContainer } from "App/components/VenuesContainer";
import { VenueList } from "App/components/VenueList";
import { VenueSeatsList } from "App/components/VenueSeatsList";
import { SeatPicker } from "App/components/SeatPicker";

describe("Components", () => {
  describe("<VenuesContainer />", () => {
    const setup = () => {
      const props = {
        currentVenue: "1",
        fetchSeats: jest.fn(),
        setSelectedSeats: jest.fn(),
        groupedSeats: [
          [],
          []
        ],
      };

      const wrapper = shallow(<VenuesContainer {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    describe("children", () => {
      describe("<VenueList />", () => {
        it("renders correctly", () => {
          const list = wrapper.find(VenueList);

          expect(list).toHaveLength(1);
        });
      });
      describe("<VenueSeatsList />", () => {
        it("renders correctly", () => {
          const list = wrapper.find(VenueSeatsList);

          expect(list).toHaveLength(1);
        });
      });
      describe("<SeatPicker />", () => {
        it("renders correctly", () => {
          const picker = wrapper.find(SeatPicker);

          expect(picker).toHaveLength(1);
        });
      });
    });
  });
});
