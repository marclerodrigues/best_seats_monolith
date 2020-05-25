import React from "react";
import { shallow } from "enzyme";
import { SeatFinderContainer } from "App/components/SeatFinderContainer";
import { SeatFinderForm } from "App/components/SeatFinderForm";

describe("Components", () => {
  describe("<SeatFinder />", () => {
    const setup = () => {
      const props = {
        currentVenue: "1",
        selectSeatsByLabel: jest.fn()
      };

      const wrapper = shallow(<SeatFinderContainer {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    it("renders the correct content", () => {
      expect(wrapper.text()).toEqual("Find the best seats!<SeatFinderForm />");
    });

    describe("children", () => {
      describe("<SeatFinderForm />", () => {
        it("renders correctly", () => {
          const seatFinderForm = wrapper.find(SeatFinderForm);

          expect(seatFinderForm).toHaveLength(1);
        });

        it("renders with the correct props", () => {
          const seatFinderForm = wrapper.find(SeatFinderForm);
          const childProps = seatFinderForm.first().props();
          const childPropsKeys = Object.keys(childProps);
          const expectedPropsKeys = [
            "setSeats",
            "currentVenue",
            "selectSeatsByLabel",
          ];

          expect(childPropsKeys).toEqual(expectedPropsKeys);
        });
      });
    });
  });
});
