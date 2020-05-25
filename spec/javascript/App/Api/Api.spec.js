import React from "react";
import mockAxios from "jest-mock-axios";
import { Api } from "App/Api";

afterEach(() => {
    mockAxios.reset();
});

describe("Utils", () => {
  describe("Api", () => {
    Api.request = mockAxios;

    describe("Venue", () => {
      describe("listAll", () => {
        it("fetches from the correct path", async () => {
          Api
            .Venue
            .listAll();

          expect(mockAxios.get).toHaveBeenCalledWith("/api/venues");
        });

        it("fetches only one time", async () => {
          Api
            .Venue
            .listAll();

          expect(mockAxios.get).toHaveBeenCalledTimes(1);
        });
      });

      describe("create", () => {
        const params = {
          venue: {
            name: "Venue",
            columns: 1,
            rows: 1,
          },
        };

        it("makes the correct request", async () => {
          Api
            .Venue
            .create(params);

          expect(mockAxios.post).toHaveBeenCalledWith("/api/venues", params);
        });

        it("calls only one time", async () => {
          Api
            .Venue
            .create(params);

          expect(mockAxios.post).toHaveBeenCalledTimes(1);
        });
      });

      describe("destroy", () => {
        const params = {
          venueId: '1'
        };

        it("makes the correct request", async () => {
          Api
            .Venue
            .destroy(params.venueId);

          expect(mockAxios.delete).toHaveBeenCalledWith("/api/venues/1");
        });

        it("calls only one time", async () => {
          Api
            .Venue
            .destroy(params.venueId);

          expect(mockAxios.delete).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("VenueSeats", () => {
      describe("listAll", () => {
        const params = {
          venueId: '1',
        };

        it("fetches from the correct path", async () => {
          Api
            .VenueSeats
            .listAll(params.venueId);

          expect(mockAxios.get).toHaveBeenCalledWith("/api/venues/1/seats");
        });

        it("fetches only one time", async () => {
          Api
            .VenueSeats
            .listAll(params.venueId);

          expect(mockAxios.get).toHaveBeenCalledTimes(1);
        });
      });

      describe("pick", () => {
        const params = {
          venueId: '1',
          seatsParams: {
            seats: {
              ids: [1, 2, 3],
              available: false,
            },
          }
        };

        it("makes the correct request", async () => {
          Api
            .VenueSeats
            .pick(params.venueId, params.seatsParams)

          expect(mockAxios.put).toHaveBeenCalledWith("/api/venues/1/seats/batches", params.seatsParams);
        });

        it("calls only one time", async () => {
          Api
            .VenueSeats
            .pick(params.venueId, params.seatsParams)

          expect(mockAxios.put).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("BestSeats", () => {
      describe("find", () => {
        const params = {
          venueId: '1',
          seatsParams: {
            seats: {
              requested: 1
            },
          },
        };

        it("fetches from the correct path", async () => {
          Api
            .BestSeats
            .find(params);

          expect(mockAxios.post).toHaveBeenCalledWith("/api/venues/1/best_seats", params.seatsParams);
        });

        it("fetches only one time", async () => {
          Api
            .BestSeats
            .find(params);

          expect(mockAxios.post).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
