import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';
import Pair from '../models/pair';

const Top10Drivers = props => {
    const volunteers = useSelector(state => state.volunteers.volunteers_from_server);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const dispatch = useDispatch();
    const [state, setState] = useState();
    const driversNames = new Set(volunteers.map(item => item.driver));
    let data = [];
    
    let array = Array.from(driversNames);
    for (let i = 0; i < array.length; i++) {
        
        const nr = volunteers.filter(
            volunteer => volunteer.driver === array[i]
        )       
        data.push(new Pair(array[i], nr.length));
    }
    data.sort((a,b) => (a.nr > b.nr) ? 1 : ((b.nr > a.nr) ? -1 : 0));
    let res = data.slice(0, 10);
    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:2019/all');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('Its connected :)')
                for(let op in operationsQueue) {
                    if (op.name === "createVolunteer") {
                        console.log(op.data)
                        createVolunteer(op.data)
                    }
                    else if (op.name === "deleteVolunteerForm")
                        deleteVolunteerForm(op.data)
                    else if (op.name === "updateVolunteerForm")
                        updateVolunteerForm(op.data)
                }
                dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromServer());
            })
            .catch(error => {
                console.log(error)
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromServer());
                dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable(operationsQueue);
    }, []);

    return (
        <FlatList
            data={res}
            keyExtractor={(item, index) => {
                return item.driver.toString();
            }}
            renderItem={itemData => (
                <VolunteerItem
                    name={itemData.item.driver}
                    status={itemData.item.nr}
                    onSelect={() => {
                        props.navigation.navigate('VolunteerDetail', {
                            volunteerName: itemData.item.name,
                            volunteerId: itemData.item.identifier,
                            volunteerStatus: itemData.item.status,
                            volunteerPassengers: itemData.item.passengers,
                            volunteerDriver: itemData.item.driver,
                            volunteerPaint: itemData.item.paint,
                            volunteerCapacity: itemData.item.capacity
                        });
                    }}
                />
            )}
        />
    );
};

Top10Drivers.navigationOptions = navData => {
    return {
        headerTitle: 'All Volunteers',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Volunteer"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewVolunteer');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default Top10Drivers;
