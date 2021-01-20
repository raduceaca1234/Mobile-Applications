import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import Loader from '../components/Loader';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

const DesiredOrNeeded = props => {
    const volunteers = useSelector(state => state.volunteers.volunteers_from_server);
    console.log(volunteers)
    let sortBy = [{
        prop: 'price',
        direction: -1
    }, {
        prop: 'quantity',
        direction: 1
    }];
    let volunteers2 = []
    for (let i = 0; i < volunteers.length; i++)
        if (volunteers[i].status === "desired" || volunteers[i].status === "needed")
            volunteers2.push(volunteers[i])

    let volunteers3 = volunteers2.sort(function (a, b) {
        let i = 0, result = 0;
        while (i < sortBy.length && result === 0) {
            result = sortBy[i].direction * (a[sortBy[i].prop].toString() < b[sortBy[i].prop].toString() ? -1 : (a[sortBy[i].prop].toString() > b[sortBy[i].prop].toString() ? 1 : 0));
            i++;
        }
        return result;
    })
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:2020/items');

        return Promise
            .race([timeout, request])
            .then(response => {
                setLoading(true)
                //alert('Its connected :)')
                console.log(operationsQueue)
                for (let i = 0; i < operationsQueue.length; i++) {

                    if (operationsQueue[i].name === "createVolunteer") {
                        console.log(operationsQueue[i].name)
                        createVolunteer(operationsQueue[i].data)
                    }
                    else if (operationsQueue[i].name === "deleteVolunteerForm")
                        deleteVolunteerForm(operationsQueue[i].data)

                }
                dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromServer());
                //dispatch(placesActions.loadVolunteersFromDb());
            })
            .catch(error => {
                console.log(error)
                setLoading(true)
                alert('Its not connected :(')
                dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromServer());
                //dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable(operationsQueue);
    }, []);

    //console.log(volunteers)

    let loader = <Loader isLoading={!loading} />
    let not_loader = <FlatList
        data={volunteers3}
        keyExtractor={(item, index) => {
            return item.id.toString();
        }}
        renderItem={itemData => (
            <VolunteerItem
                name={itemData.item.name}
                status={itemData.item.status}
                passengers={itemData.item.quantity}
                capacity={itemData.item.price}
                onSelect={() => {
                    props.navigation.navigate('Buy', {
                        volunteerName: itemData.item.name,
                        volunteerId: itemData.item.id,
                        volunteerStatus: itemData.item.status,
                        volunteerPassengers: itemData.item.quantity,
                        volunteerCapacity: itemData.item.price
                    });
                }}
            />
        )}
    />

    const isLoadingOrNot = () => {
        let v = loading ? not_loader : loader;
        return v;
    }
    return (

        isLoadingOrNot()


    );

};

DesiredOrNeeded.navigationOptions = navData => {
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

export default DesiredOrNeeded;
