import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/volunteers-actions';

const PlacesListScreen = props => {
    const volunteers = useSelector(state => state.volunteers.volunteers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={volunteers}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    name={itemData.item.name}
                    phoneNumber={itemData.item.phoneNumber}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                            volunteerName: itemData.item.name,
                            volunteerId: itemData.item.id,
                            volunteerPhoneNumber: itemData.item.phoneNumber
                        });
                    }}
                />
            )}
        />
    );
};

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Volunteers',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Volunteer"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
