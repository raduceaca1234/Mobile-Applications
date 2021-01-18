import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PaintItem from '../components/PaintItem';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

const PaintList = props => {
    const volunteers = useSelector(state => state.volunteers.paints);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const dispatch = useDispatch();
    const [state, setState] = useState();

    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:1876/types');

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
                dispatch(placesActions.loadPaints());
            })
            .catch(error => {
                console.log(error)
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadPaints());
                dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable(operationsQueue);
    }, []);

    console.log(volunteers)

    return (
        <FlatList
            data={volunteers}
            keyExtractor={(item, index) => {
                return item.name.toString();
            }}
            renderItem={itemData => (
                <PaintItem
                    name={itemData.item.name}
                    status={itemData.item.status}
                    passengers={itemData.item.passengers}
                    driver={itemData.item.driver}
                    paint={itemData.item.paint}
                    capacity={itemData.item.capacity}
                    onSelect={() => {
                        props.navigation.navigate('FilteredVechicles', {
                            paint: itemData.item.name
                        });
                    }}
                />
            )}
        />
    );
};

PaintList.navigationOptions = navData => {
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

export default PaintList;
