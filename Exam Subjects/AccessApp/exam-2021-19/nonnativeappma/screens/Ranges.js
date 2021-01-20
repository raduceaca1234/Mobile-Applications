import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import Loader from '../components/Loader';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';
import { insertVolunteer } from '../helpers/db';

const Ranges = props => {
    const volunteers = useSelector(state => state.volunteers.volunteers_from_server);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const from = props.navigation.getParam('from');
    const to = props.navigation.getParam('to');
    let result = []
    for(let i= 0;i< volunteers.length; i++)
    {
       
        if(volunteers[i].from>from && volunteers[i].to<to)
            result.push(volunteers[i])
    }
    console.log(result)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    //console.log(volunteers[0])
    for (let i = 0; i < volunteers.length; i++) {
        //console.log(volunteers[i].name, volunteers[i].level, volunteers[i].status, volunteers[i].from, volunteers[i].to)
        insertVolunteer(volunteers[i].name, volunteers[i].level, volunteers[i].status, volunteers[i].from, volunteers[i].to)
    }
    placesActions.loadVolunteersFromDb();
    const volunteers2 = useSelector(state => state.volunteers.volunteers);
    console.log("From db:" + volunteers2)
    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:2019/rules');

        return Promise
            .race([timeout, request])
            .then(response => {
                setLoading(true)
                //alert('Its connected :)')
                for (let i = 0; i < operationsQueue.length; i++) {

                    if (operationsQueue[i].name === "createVolunteer") {
                        console.log(operationsQueue[i].name)
                        createVolunteer(operationsQueue[i].data)
                    }
                    else if (op.name === "deleteVolunteerForm")
                        deleteVolunteerForm(op.data)
                    else if (op.name === "updateVolunteerForm")
                        updateVolunteerForm(op.data)
                }
                dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromServer());
                //dispatch(placesActions.loadVolunteersFromDb());
            })
            .catch(error => {
                console.log(error)
                setLoading(true)
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
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
        data={result}
        keyExtractor={(item, index) => {
            return item.id.toString();
        }}
        renderItem={itemData => (
            <VolunteerItem
                name={itemData.item.name}
                status={itemData.item.status}
                passengers={itemData.item.from}
                driver={itemData.item.level}
                capacity={itemData.item.to}
                onSelect={() => {
                    props.navigation.navigate('LoadDetails', {
                        volunteerName: itemData.item.name,
                        volunteerId: itemData.item.id,
                        volunteerStatus: itemData.item.status,
                        volunteerPassengers: itemData.item.size,
                        volunteerDriver: itemData.item.location,
                        volunteerCapacity: itemData.item.usage
                    });
                }}
            />
        )}
    />

    const isLoadingOrNot = () => {
        let v = loading ? not_loader : loader;
        return v;
    }
    const display = () =>{
        let v = volunteers.length === 0 ? <Text>Nothing here</Text> : isLoadingOrNot()
        return v;
    }
    return (

        display()


    );

};

Ranges.navigationOptions = navData => {
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

export default Ranges;
