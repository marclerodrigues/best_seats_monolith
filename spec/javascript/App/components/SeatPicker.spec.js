import React from "react";
import { shallow } from "enzyme";
import { SeatPicker } from "App/components/SeatPicker";

describe("Components", () => {
  describe("<SeatPicker />", () => {
    const setup = () => {
      const props = {
        venueid: "1",
        selectedSeats: [],
        columns: 0,
        updateVenueSeats: jest.fn(),
      };

      const wrapper = shallow(<SeatPicker {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    describe("children", () => {
      it("renders the correct button", () => {
        const button = wrapper.find(".seat-picker-button");

        expect(button).toHaveLength(1);
      });

      it("renders the correct content", () => {
        const button = wrapper.find(".seat-picker-button");

        expect(button.text()).toEqual("Pick Seats");
      });
    });
  });
});
