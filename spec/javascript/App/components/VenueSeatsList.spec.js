import React from "react";
import { shallow } from "enzyme";
import { VenueSeatsList } from "App/components/VenueSeatsList";
import { SeatFinderContainer } from "App/components/SeatFinderContainer";
import { SeatRow } from "App/components/SeatRow";

describe("Components", () => {
  describe("<VenueSeatsList />", () => {
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

      const wrapper = shallow(<VenueSeatsList {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    describe("children", () => {
      describe("<Stage />", () => {
        it("renders correctly", () => {
          const stageContainer = wrapper.find(".state-content");

          expect(stageContainer).toHaveLength(1);
        });

        it("renders the correct text", () => {
          const stageContainer = wrapper.find(".state-content");

          expect(stageContainer.text()).toEqual("STAGE");
        });
      });

      describe("<SeatFinderContainer />", () => {
        it("renders correctly", () => {
          const seatFinderContainer = wrapper.find(SeatFinderContainer);

          expect(seatFinderContainer).toHaveLength(1);
        });
      });

      describe("<SeatRow />", () => {
        it("renders correctly", () => {
          const seatFinderContainer = wrapper.find(SeatRow);

          expect(seatFinderContainer).toHaveLength(2);
        });
      });
    });
  });
});
