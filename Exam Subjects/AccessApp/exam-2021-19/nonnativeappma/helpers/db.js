import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vechicleA.db');

const db2 = SQLite.openDatabase('driver_name.db');

export const init2 = () => {
    const promise = new Promise((resolve, reject) => {
        db2.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS driver_name (id INTEGER PRIMARY KEY NOT NULL,  name TEXT NOT NULL);',
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

export const insertName = (name) => {
    const promise = new Promise((resolve, reject) => {
        db2.transaction(tx => {
            tx.executeSql(
                `INSERT INTO driver_name (name) VALUES (?);`,
                [name],
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


export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS vechicles_table2 (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, level TEXT NOT NULL, status TEXT NOT NULL, fromValue INTEGER NOT NULL, toValue INTEGER NOT NULL);',
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

export const deleteAll = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM vechicles_table',
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


export const insertVolunteer = (name, level, status, fromValue, toValue) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO vechicles_table2 (name, level, status, fromValue, toValue) VALUES (?, ?, ?, ?, ?);`,
                [name, level, status, fromValue, toValue],
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

export const updateName = (id, name) => {
    const promise = new Promise((resolve, reject) => {
        db2.transaction(tx => {
            tx.executeSql(
                `UPDATE driver_name SET name = ? WHERE id = ?;`,
                [id, name],
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

export const fetchName = () => {
    const promise = new Promise((resolve, reject) => {
        db2.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM driver_name',
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

export const deleteVolunteerFromDb = (identifier) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM vechicles_table WHERE identifier = ?;`,
                [identifier],
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


export const updateVolunteerFrom = (identifier, name, status, passengers, driver, paint, capacity) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE vechicles_table SET name = ? , phoneNumber = ? WHERE identifier = ?;`,
                [identifier, name, status, passengers, driver, paint, capacity],
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
                'SELECT * FROM vechicles_table2',
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