import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import * as placesActions from '../store/volunteers-actions';
import Colors from '../constants/Colors';

const LoadDetails = props => {
    const volunteerId = props.navigation.getParam('volunteerId');
    const dispatch = useDispatch();
    const volunteers = useSelector(state => state.volunteers.details);
    const name = volunteers.name;
    const level = volunteers.level;
    const status = volunteers.status;
    const from = volunteers.from;
    const to = volunteers.to;
    const selectedVolunteer = useSelector(state =>
        state.volunteers.volunteers.find(place => place.id === volunteerId)
    );
    
    const isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        const request = fetch('http://10.0.2.2:2019/rule/' + volunteerId);

        return Promise
            .race([timeout, request])
            .then(response => {
                
                alert('Its connected :)')
                dispatch(placesActions.loadDetails(volunteerId));
                //dispatch(placesActions.loadVolunteersFromDb());
            })
            .catch(error => {
                console.log(error);
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadDetails(volunteerId));
                //dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable();
    }, []);




    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{name}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{level}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{status}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{from}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{to}</Text>
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.View}>
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                console.log(volunteerId)
                                props.navigation.navigate('UpdateScreen', {
                                    id: volunteerId,
                                    name: name,
                                    level: level,
                                    status : status,
                                    from : from,
                                    to : to
                                });
                            }}
                        />
                    </View>
                    <View style={styles.View}>
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            onPress={() => {
                                props.navigation.navigate('DeleteScreen', {
                                    id: volunteerId,
                                    name: name
                                });
                            }}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

LoadDetails.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('volunteerName')
    };
};

const styles = StyleSheet.create({
    detailsContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    inputContainer: {
        padding: 15
    },
    input: {
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 5
    },
    View: {
        marginHorizontal: 100
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});

export default LoadDetails;