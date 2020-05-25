import axios from "axios";

const defaultToken = { content: "no-csrf-token"};
const token = document.querySelector("[name=\"csrf-token\"]") || defaultToken;

export const request = axios.create({
  headers: {
    common: {
      "X-CSRF-Token": token.content
    }
  }
});

const Api = {
  request: request,
};

Api.Venue = {
  listAll: () => {
    return Api.request.get("/api/venues");
  },
  create: (params) => {
    return Api.request.post("/api/venues", params);
  },
  destroy: (venueId) => {
    return Api.request.delete(`/api/venues/${venueId}`);
  }
};

Api.VenueSeats = {
  listAll: (venueId) => {
    return Api.request.get(`/api/venues/${venueId}/seats`);
  },
  pick: (venueId, seatsParams) => {
    return Api.request.put(`/api/venues/${venueId}/seats/batches`, seatsParams)
  }
}

Api.BestSeats = {
  find: ({ venueId, seatsParams }) => {
    return Api.request.post(`/api/venues/${venueId}/best_seats`, seatsParams);
  }
}

export { Api };

export default Api;
