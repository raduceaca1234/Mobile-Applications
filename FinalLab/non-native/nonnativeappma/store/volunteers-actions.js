import {
    insertVolunteer,
    fetchVolunteersFromDb,
    deleteVolunteerFromDb,
    updateVolunteerFrom
} from '../helpers/db';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

export const ADD_VOLUNTEER = 'ADD_VOLUNTEER';
export const SET_VOLUNTEERS = 'SET_VOLUNTEERS';
export const DELETE_VOLUNTEER = 'DELETE_VOLUNTEER';
export const UPDATE_VOLUNTEER = 'UPDATE_VOLUNTEER';
export const ADD_OPERATION = 'ADD_OPERATION';
export const DELETE_OPERATIONS = 'DELETE_OPERATIONS';
export const SET_VOLUNTEERS_FROM_SERVER = 'SET_VOLUNTEERS_FROM_SERVER';

// export const addVolunteer = (name, phoneNumber, date) => async{
//     return
//     createVolunteer({
//         name,
//         phoneNumber,
//         date
//     });

// };

export const loadVolunteersFromServer = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchVolunteers();
            console.log("Data from server", dbResult);
            dispatch({ type: SET_VOLUNTEERS_FROM_SERVER, volunteers: dbResult });
        } catch (err) {
            throw err;
        }
    };
};


export const addOperation = (name, data) => {
    return async dispatch => {
        dispatch({
            type: ADD_OPERATION,
            operation: {
                name: name,
                data: data
            }
        })
    }
}

export const deleteOperations = () => {
    return async dispatch => {
        dispatch({
            type: ADD_OPERATION,
            operation: {
                
            }
        })
    }
}


export const addVolunteer = (name, phoneNumber, date) => {
    return async dispatch => {
        try {
            const dbResult = await insertVolunteer(
                name,
                phoneNumber,
                date
            );
            console.log(dbResult);
            dispatch({
                type: ADD_VOLUNTEER,
                placeData: {
                    id: dbResult.insertId,
                    name: name,
                    phoneNumber: phoneNumber,
                    date: date
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadVolunteers = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchVolunteers();
            console.log(dbResult);
            dispatch({ type: SET_VOLUNTEERS, volunteers: dbResult });
        } catch (err) {
            dispatch(loadVolunteersFromDb())
        }
    };
};

export const loadVolunteersFromDb = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchVolunteersFromDb();
            console.log(dbResult);
            dispatch({ type: SET_VOLUNTEERS, volunteers: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};


export const deleteVolunteer = (phoneNumber) => {
    return async dispatch => {
        try {
            const dbResult = await deleteVolunteerForm({ phoneNumber });
            console.log(dbResult);
            dispatch({ type: DELETE_VOLUNTEER, data: dbResult });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteVolunteerDb = (phoneNumber) => {
    return async dispatch => {
        try {
            const dbResult = await deleteVolunteerFromDb(phoneNumber);
            console.log(dbResult);
            dispatch({ type: DELETE_VOLUNTEER, data: dbResult });
        } catch (err) {
            throw err;
        }
    };
};


// export const updateVolunteer = (id, name, phoneNumber, date) => {
//     return async dispatch => {
//         try {
//             console.log("bbbb", id)
//             const dbResult = await updateVolunteerForm({id, name, phoneNumber, date});
//             console.log("bd reuslt from update" + dbResult);
//             dispatch({ type: UPDATE_VOLUNTEER, id: id, name: name, phoneNumber: phoneNumber, date: date, payload: dbResult });
//         } catch (err) {
//             throw err;
//         }
//     };
// };
