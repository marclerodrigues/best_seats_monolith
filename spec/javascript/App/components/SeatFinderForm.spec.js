import React from "react";
import { shallow } from "enzyme";
import { SeatFinderForm } from "App/components/SeatFinderForm";

describe("Components", () => {
  describe("<SeatFinderForm />", () => {
    const setup = () => {
      const props = {
        currentVenue: "1",
      };

      const wrapper = shallow(<SeatFinderForm {...props} />);

      return {
        props,
        wrapper,
      };
    };

    const { props, wrapper } = setup();

    describe("children", () => {
      describe("form", () => {
        it("renders a form", () => {
          const form = wrapper.find(".form");

          expect(form).toHaveLength(1);
        });
      });

      describe("form label and inputs", () => {
        it("renders the correct label", () => {
          const label = wrapper.find("label");

          expect(label.text()).toEqual("Seats Requested:");
        });

        describe("input", () => {
          it("renders the input", () => {
            const input = wrapper.find("#seats_requested");

            expect(input).toHaveLength(1);
          });

          it("renders the input with the correct props", () => {
            const input = wrapper.find("#seats_requested");
            const inputProps = input.props();
            const onChange = () => null;
            const expectedProps = {
              type: "text",
              name: "seats_requested",
              id: "seats_requested",
              value: "",
              required: "required",
              inputMode: "numeric",
              pattern: "[0-9]*",
              onChange: onChange,
              autoComplete: "off"
            };
            expect(JSON.stringify(inputProps)).toEqual(JSON.stringify(expectedProps));
          });
        });
      });
    });
  });
});
