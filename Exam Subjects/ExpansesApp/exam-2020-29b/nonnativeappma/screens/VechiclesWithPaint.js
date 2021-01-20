import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';
import Loader from '../components/Loader';

const VechiclesWithPaint = props => {
    const volunteers = useSelector(state => state.volunteers.locations);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const paint = props.navigation.getParam('paint');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState();
    const data = volunteers.filter(
        volunteer => volunteer.paint === paint
    )
    console.log(volunteers)
    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:2702/files/' + paint);

        return Promise
            .race([timeout, request])
            .then(response => {
                //alert('Its connected :)')
                setLoading(true)
                dispatch(placesActions.loadVolunteersLocation2());
                for (let op in operationsQueue) {
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
                dispatch(placesActions.loadVolunteersLocation(paint));
            })
            .catch(error => {
                console.log(error)
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersLocation(paint));
                //dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable(operationsQueue);
    }, []);

    let loader = <Loader isLoading={!loading} />
    let not_loader = <FlatList
        data={volunteers}
        keyExtractor={(item, index) => {
            return item.id.toString();
        }}
        renderItem={itemData => (
            <VolunteerItem
                name={itemData.item.name}
                status={itemData.item.status}
                passengers={itemData.item.size}
                driver={itemData.item.location}
                capacity={itemData.item.usage}
                onSelect={() => {
                    props.navigation.navigate('VolunteerDetail', {
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
    return (
        
        isLoadingOrNot()
                
        
    );
};

VechiclesWithPaint.navigationOptions = navData => {
    return {
        headerTitle: 'All Paints',
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

export default VechiclesWithPaint;
