import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import Loader from '../components/Loader';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

const VolunteersListScreen = props => {
    const volunteers = useSelector(state => state.volunteers.volunteers_from_server);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        }); 
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:2902/open');

        return Promise
            .race([timeout, request])
            .then(response => {
                setLoading(true)
                //alert('Its connected :)')
                console.log(operationsQueue)
                for (let i=0;i< operationsQueue.length;i++) {
                    
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

    let loader = <Loader isLoading={!loading}/>
    let not_loader = <FlatList
        data={volunteers}
        keyExtractor={(item, index) => {
            return item.id.toString();
        }}
        renderItem={itemData => (
            <VolunteerItem
                name={itemData.item.name}
                status={itemData.item.status}
                passengers={itemData.item.eCost}
                driver={itemData.item.student}
                capacity={itemData.item.cost}
                onSelect={() => {
                    props.navigation.navigate('Filled', {
                        volunteerId: itemData.item.id,
                        volunteerStatus: itemData.item.status,
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

VolunteersListScreen.navigationOptions = navData => {
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

export default VolunteersListScreen;
