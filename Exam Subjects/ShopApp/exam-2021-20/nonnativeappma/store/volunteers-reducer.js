import { SET_BOUGHT, SET_LOCATIONS2, SET_LOCATIONS, SET_PAINT, SET_NAME, SET_ME, ADD_NAME, ADD_VOLUNTEER, DELETE_VOLUNTEER, SET_VOLUNTEERS, UPDATE_VOLUNTEER, ADD_OPERATION, SET_VOLUNTEERS_FROM_SERVER, DELETE_OPERATIONS } from './volunteers-actions';
import Volunteer from '../models/volunteer';
import Operation from '../models/operation';
import Paint from '../models/paint';

const initialState = {
  volunteers: [],
  volunteers_from_server: [],
  paints: [],
  mine: [],
  operationsQueue: [],
  name: null,
  locations: [],
  desiredorneded: [],
  bought: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state,
        name: action.name
      }
    case SET_PAINT:
      return {
        ...state, paints: action.paints.map(
          pl =>
            new Paint(
              pl
            ))
      };
    case SET_NAME:
      return {
        ...state,
        name: action.volunteers.slice(-1).pop().name
      }
    case DELETE_OPERATIONS:
      return {
        ...state, operationsQueue: []
      }
    case SET_VOLUNTEERS_FROM_SERVER:
      return {
        ...state, volunteers_from_server: action.volunteers
      };
    case SET_BOUGHT:
      return {
        ...state, bought: action.volunteers
      };
    case SET_LOCATIONS:
      return {
        ...state, locations: action.volunteers
      }
    case SET_LOCATIONS2:
      return {
        ...state, locations: []
      }
    case SET_ME:
      return {
        ...state, mine: action.me
      };
    case ADD_OPERATION:
      const newOperation = new Operation(
        action.name,
        action.data
      );
      console.log("OPERATIONS: ", state.operationsQueue)
      return {
        ...state,
        operationsQueue: state.operationsQueue.concat(newOperation)
      };
    case SET_VOLUNTEERS:
      return {
        ...state,
        volunteers: action.volunteers.map(
          pl =>
            new Volunteer(
              pl.id,
              pl.identifier,
              pl.name,
              pl.status,
              pl.passengers,
              pl.driver,
              pl.paint,
              pl.capacity
            )
        )
      };
    case ADD_VOLUNTEER:
      console.log("oooo" + { id: action.id, name: action.name, quantity: action.quantity, price: action.price, status: action.status })
      return {
        volunteers_from_server: state.volunteers_from_server.concat({ id: action.id, name: action.name, quantity: action.quantity, price: action.price, status: action.status })
      };
    case DELETE_VOLUNTEER:
      return {
        ...state,
        volunteers_from_server: state.volunteers_from_server.filter(
          volunteer => volunteer.id !== action.identifier
        )
      };
    case UPDATE_VOLUNTEER:
      const volIndex = state.volunteers.findIndex(
        vol => vol.identifier === action.identifier
      );
      const updatedVolunteer = new Volunteer(
        action.id,
        action.identifier,
        action.name,
        action.status,
        action.passengers,
        action.driver,
        action.paint,
        action.capacity
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
