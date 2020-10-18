import { ADD_PLACE, DELETE_VOLUNTEER, SET_PLACES, UPDATE_VOLUNTEER } from './volunteers-actions';
import Volunteer from '../models/volunteer';

const initialState = {
  volunteers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        volunteers: action.volunteers.map(
          pl =>
            new Volunteer(
              pl.id.toString(),
              pl.name,
              pl.phoneNumber
            )
        )
      };
    case ADD_PLACE:
      const newPlace = new Volunteer(
        action.placeData.id.toString(),
        action.placeData.name,
        action.placeData.phoneNumber
      );
      return {
        volunteers: state.volunteers.concat(newPlace)
      };
    case DELETE_VOLUNTEER:
        return {
            ...state,
            volunteers: state.volunteers.filter(
              volunteer => volunteer.phoneNumber !== action.phoneNumber
            )
          };
    case UPDATE_VOLUNTEER:
        const volIndex = state.volunteers.findIndex(
            vol => vol.id === action.id
          );
          const updatedVolunteer = new Volunteer(
            action.id,
            action.name,
            action.phoneNumber
          );
          const updatedVolunteers = [...state.volunteers];
          updatedVolunteers[volIndex] = updatedVolunteer;
          return {
            ...state,
            volunteers: updatedVolunteers
          };
    default:
      return state;
  }
};
