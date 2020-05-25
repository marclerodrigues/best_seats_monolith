import React from "react";
import { shallow } from "enzyme";
import AppContainer from "App";
import { VenuesContainer } from "App/components";

describe("Components", () => {
  describe("<AppContainer />", () => {
    const setup = () => {
      const wrapper = shallow(<AppContainer />);

      return {
        wrapper,
      };
    };

    const { wrapper } = setup();

    describe("children", () => {
      describe("<VenuesContainer />", () => {
        it("renders correctly", () => {
          const venuesContainer = wrapper.find(VenuesContainer);

          expect(venuesContainer).toHaveLength(1);
        });

        it("renders with the correct props", () => {
          const venuesContainer = wrapper.find(VenuesContainer);
          const childProps = venuesContainer.first().props();
          const propsKeys = Object.keys(childProps);
          const expectedProps = {
            currentVenue: "",
          };
          const expectedKeys = [
            "setCurrentVenue",
            "currentVenue",
          ];
          const expectedResult = expect.objectContaining(expectedProps);

          expect(childProps).toEqual(expectedResult);
          expect(propsKeys).toEqual(expectedKeys);
        });
      });
    });
  });
});
