import { ADD_VOLUNTEER, DELETE_VOLUNTEER, SET_VOLUNTEERS, UPDATE_VOLUNTEER, ADD_OPERATION, SET_VOLUNTEERS_FROM_SERVER, DELETE_OPERATIONS } from './volunteers-actions';
import Volunteer from '../models/volunteer';
import Operation from '../models/operation';

const initialState = {
  volunteers: [],
  volunteers_from_server: [],
  operationsQueue: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_OPERATIONS:
      return{
        ...state, operationsQueue: []
      }
    case SET_VOLUNTEERS_FROM_SERVER:
      return {
        ...state, volunteers_from_server: action.volunteers
      };
    case ADD_OPERATION:
      const newOperation = new Operation(
        action.name,
        action.data
      );
      console.log("OPERATIONS: ", state.operationsQueue)
      return{
        ...state,
        operationsQueue: state.operationsQueue.concat(newOperation)
      };
    case SET_VOLUNTEERS:
      return {
        ...state,
        volunteers: action.volunteers.map(
          pl =>
            new Volunteer(
              pl.id.toString(),
              pl.name,
              pl.phoneNumber,
              pl.date
            )
        )
      };
    case ADD_VOLUNTEER:
      const newPlace = new Volunteer(
        action.placeData.id.toString(),
        action.placeData.name,
        action.placeData.phoneNumber,
        action.placeData.date
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
        action.phoneNumber,
        action.date
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
