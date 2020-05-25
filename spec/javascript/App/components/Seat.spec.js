import React from "react";
import { shallow } from "enzyme";
import { Seat, backgroundColor } from "App/components/Seat";

describe("Components", () => {
  describe("<Seat />", () => {
    const setup = () => {
      const props = {
        id: 1,
        label: "a1",
        available: true,
        isSelected: false,
        selectSeat: jest.fn(),
        deselectSeat: jest.fn(),
      };

      const wrapper = shallow(<Seat {...props} />);

      return {
        props,
        wrapper,
      };
    };

    it("renders the correct label", () => {
      const { wrapper } = setup();

      expect(wrapper.text()).toEqual("A1");
    });

    describe("select seat", () => {
      it("calls the correct prop function", () => {
        const { props, wrapper } = setup();

        wrapper.simulate('click', { preventDefault: jest.fn() });

        expect(props.selectSeat).toHaveBeenCalled();
      });
    });

    describe("deselect seat", () => {
      it("calls the correct prop function", () => {
        const { props, wrapper } = setup();

        wrapper.simulate('click', { preventDefault: jest.fn() });
        wrapper.simulate('click', { preventDefault: jest.fn() });

        expect(props.deselectSeat).toHaveBeenCalled();
        expect(props.selectSeat).toHaveBeenCalled();
      });
    });
  });

  describe("backgroundColor", () => {
    describe("when available and selected", () => {
      it("returns the correct value", () => {
        const color =  backgroundColor(true, true);
        const expectedColor = "#F7DBA7";

        expect(color).toEqual(expectedColor);
      });
    });

    describe("when available but not selected", () => {
      it("returns the correct value", () => {
        const color =  backgroundColor(true, false);
        const expectedColor = "#1D7874";

        expect(color).toEqual(expectedColor);
      });
    });

    describe("when not available and not selected", () => {
      it("returns the correct value", () => {
        const color =  backgroundColor(false, false);
        const expectedColor = "#ACBDBA";

        expect(color).toEqual(expectedColor);
      });
    });
  });
});
