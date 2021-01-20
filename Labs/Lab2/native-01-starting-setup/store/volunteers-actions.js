import { insertPlace, fetchPlaces, deleteVolunteerFrom, updateVolunteerFrom } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const DELETE_VOLUNTEER = 'DELETE_VOLUNTEER';
export const UPDATE_VOLUNTEER = 'UPDATE_VOLUNTEER';

export const addPlace = (name, phoneNumber) => {
    return async dispatch => {
        try {
            const dbResult = await insertPlace(
                name,
                phoneNumber,
            );
            console.log(dbResult);
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    name: name,
                    phoneNumber: phoneNumber,
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({ type: SET_PLACES, volunteers: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};


export const deleteVolunteer = (phoneNumber) => {
    return async dispatch => {
        try {
            const dbResult = await deleteVolunteerFrom(phoneNumber);
            console.log(dbResult);
            dispatch({ type: DELETE_VOLUNTEER, phoneNumber: phoneNumber });
        } catch (err) {
            throw err;
        }
    };
};

export const updateVolunteer = (id, name, phoneNumber) => {
    return async dispatch => {
        try {
            const dbResult = await updateVolunteerFrom(id, name, phoneNumber);
            console.log(dbResult);
            dispatch({ type: UPDATE_VOLUNTEER, id: id, name: name, phoneNumber: phoneNumber });
        } catch (err) {
            throw err;
        }
    };
};
