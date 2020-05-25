import React from "react";
import { shallow } from "enzyme";
import { SeatRow } from "App/components/SeatRow";
import { Seat } from "App/components/Seat";

describe("Components", () => {
  describe("<SeatRow />", () => {
    describe("when no seats", () => {
      const setup = () => {
        const props = {
          seats: [],
          selectSeat: jest.fn(),
          deselectSeat: jest.fn(),
          selectedSeats: [],
        };

        const wrapper = shallow(<SeatRow {...props} />);

        return {
          props,
          wrapper,
        };
      };

      const { props, wrapper } = setup();

      describe("children", () => {
        it("does not render the seats", () => {
          const seat = wrapper.find(Seat);

          expect(seat).toHaveLength(0);
        });
      });
    });

    describe("when there are seats", () => {
      const setup = () => {
        const props = {
          seats: [
            {
              id: 1,
              label: "a1",
              available: false,
              selectSeat: jest.fn(),
              isSelected: false,
              deselectSeat: jest.fn()
            }
          ],
          selectSeat: jest.fn(),
          deselectSeat: jest.fn(),
          selectedSeats: [],
        };

        const wrapper = shallow(<SeatRow {...props} />);

        return {
          props,
          wrapper,
        };
      };

      const { props, wrapper } = setup();

      describe("children", () => {
        it("renders the seats", () => {
          const seat = wrapper.find(Seat);

          expect(seat).toHaveLength(1);
        });

        it("renders the seats with the correct props", () => {
          const seat = wrapper.find(Seat);
          const seatProps = seat.first().props();
          const expectedProps = {
            "id": 1,
            "label": "a1",
            "available": false,
            "deselectSeat": jest.fn(),
            "isSelected": false,
            "selectSeat": jest.fn(),
          };

          expect(JSON.stringify(seatProps)).toEqual(JSON.stringify(expectedProps));
        });
      });
    });
  });
});
