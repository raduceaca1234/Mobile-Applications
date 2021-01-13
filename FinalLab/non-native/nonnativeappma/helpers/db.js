import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vol_table.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS volunteers_table (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phoneNumber TEXT NOT NULL, date TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertVolunteer = (name, phoneNumber, date) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO volunteers_table (name, phoneNumber, date) VALUES (?, ?, ?);`,
                [name, phoneNumber, date],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const deleteVolunteerFromDb = (phoneNumber) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM volunteers_table WHERE id = ?;`,
                [phoneNumber],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject("ERRRR",err);
                }
            );
        });
    });
    return promise;
};


export const updateVolunteerFrom = (id, name, phoneNumber) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE volunteers_table SET name = ? , phoneNumber = ? WHERE id = ?;`,
                [name, phoneNumber, id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchVolunteersFromDb = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM volunteers_table',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};