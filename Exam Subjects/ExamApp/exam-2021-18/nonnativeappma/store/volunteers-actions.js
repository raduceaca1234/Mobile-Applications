import {
    insertVolunteer,
    fetchVolunteersFromDb,
    deleteVolunteerFromDb,
    insertName,
    fetchName,
    updateVolunteerFrom
} from '../helpers/db';
import { joinExam, fetchDrafts, fetchDetails, fetchVolunteersLocation, fetchPaints, fetchVolunteersMe, fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

export const SET_ME = 'SET_ME';
export const SET_NAME = 'SET_NAME';
export const ADD_NAME = 'ADD_NAME';
export const ADD_VOLUNTEER = 'ADD_VOLUNTEER';
export const SET_VOLUNTEERS = 'SET_VOLUNTEERS';
export const DELETE_VOLUNTEER = 'DELETE_VOLUNTEER';
export const UPDATE_VOLUNTEER = 'UPDATE_VOLUNTEER';
export const ADD_OPERATION = 'ADD_OPERATION';
export const DELETE_OPERATIONS = 'DELETE_OPERATIONS';
export const SET_VOLUNTEERS_FROM_SERVER = 'SET_VOLUNTEERS_FROM_SERVER';
export const SET_PAINT = 'SET_PAINT';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SET_LOCATIONS2 = 'SET_LOCATIONS2';
export const SET_DETAILS = 'SET_DETAILS';
export const SET_DRAFTS = 'SET_DRAFTS';

// export const addVolunteer = (name, phoneNumber, date) => async{
//     return
//     createVolunteer({
//         name,
//         phoneNumber,
//         date
//     });

// };
export const loadDetails = (id) => {
    return async dispatch => {
        try {
            const dbResult = await fetchDetails({id});
            dispatch({ type: SET_DETAILS, volunteers: dbResult });
        } catch (err) {
            throw err;
        }
    };
};

export const loadDrafts = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchDrafts();
            dispatch({ type: SET_DRAFTS, volunteers: dbResult });
        } catch (err) {
            throw err;
        }
    };
};

export const loadVolunteersFromServer = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchVolunteers();
            dispatch({ type: SET_VOLUNTEERS_FROM_SERVER, volunteers: dbResult });
        } catch (err) {
            throw err;
        }
    };
};


export const loadVolunteersLocation2 = () => {
    return async dispatch => {
        try {
            dispatch({ type: SET_LOCATIONS2, volunteers: [] });
        } catch (err) {
            throw err;
        }
    };
};

export const loadVolunteersLocation = (location) => {
    return async dispatch => {
        try {
            const dbResult = await fetchVolunteersLocation({location});
            dispatch({ type: SET_LOCATIONS, volunteers: dbResult });
        } catch (err) {
            throw err;
        }
    };
};

export const loadPaints = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPaints();
            console.log(Object.entries(dbResult));
            dispatch({ type: SET_PAINT, paints: dbResult });
        } catch (err) {
            throw err;
        }
    };
};


export const receiveAddedData = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPaints();
            console.log(Object.entries(dbResult));
            dispatch({ type: SET_PAINT, paints: dbResult });
        } catch (err) {
            throw err;
        }
    };
}

export const loadMe = (driver) => {
    return async dispatch => {
        try {
            const dbResult = await fetchVolunteersMe({driver});
            if(dbResult.length === 0) {
                alert('Nothing here :(')
            }
            dispatch({ type: SET_ME, me: dbResult });
        } catch (err) {
            throw err;
        }
    };
};

export const addName = (name) => {
    return async dispatch => {
        try {
            const dbResult = await insertName(name);
            dispatch({ type: ADD_NAME, name: name });
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
            type: DELETE_OPERATIONS,
            operation: {
                
            }
        })
    }
}


export const addVolunteer = (identifier, name, status, passengers, driver, paint, capacity) => {
    return async dispatch => {
        try {
            const dbResult = await insertVolunteer(
                identifier, name, status, passengers, driver, paint, capacity
            );
            console.log(dbResult);
            dispatch({
                type: ADD_VOLUNTEER,
                placeData: {
                    id: dbResult.insertId,
                    identifier: identifier,
                    name: name,
                    status: status,
                    passengers: passengers,
                    driver: driver,
                    paint: paint,
                    capacity: capacity
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

export const loadName = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchName();
            console.log(dbResult);
            dispatch({ type: SET_NAME, volunteers: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};


export const deleteVolunteer = (identifier) => {
    return async dispatch => {
        try {
            const dbResult = await deleteVolunteerForm({ identifier });
            console.log(dbResult);
            dispatch({ type: DELETE_VOLUNTEER, data: dbResult });
        } catch (err) {
            throw err;
        }
    };
};

export const joinExams = (identifier) => {
    return async dispatch => {
        try {
            const dbResult = await joinExam(identifier);
            console.log(dbResult);
            
        } catch (err) {
            throw err;
        }
    };
};


export const deleteVolunteerDb = (identifier) => {
    return async dispatch => {
        try {
            const dbResult = await deleteVolunteerFromDb(identifier);
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
