import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AntDesign } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
    const volunteerId = props.navigation.getParam('volunteerId');
    const name = props.navigation.getParam('volunteerName');
    const phoneNumber = props.navigation.getParam('volunteerPhoneNumber');
    const selectedVolunteer = useSelector(state =>
        state.volunteers.volunteers.find(place => place.id === volunteerId)
    );

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{name}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{phoneNumber}</Text>
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.View}>
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                props.navigation.navigate('UpdateScreen', {
                                    id: volunteerId,
                                    name: selectedVolunteer.name,
                                    phoneNumber: selectedVolunteer.phoneNumber
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
                                    name: selectedVolunteer.name,
                                    phoneNumber: selectedVolunteer.phoneNumber
                                });
                            }}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

PlaceDetailScreen.navigationOptions = navData => {
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

export default PlaceDetailScreen;
