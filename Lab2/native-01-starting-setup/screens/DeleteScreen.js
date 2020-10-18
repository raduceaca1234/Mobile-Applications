import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';

const DeleteScreen = props => {
    const name = props.navigation.getParam('name');
    const phoneNumber = props.navigation.getParam('phoneNumber');
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Text style={styles.name}>Name: {name}</Text>
            <Text style={styles.phoneNumber}>Phone Number: {phoneNumber}</Text>
            <Text style={styles.question}>Are you sure you want to delete this volunteer?</Text>
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="DELETE"
                    onPress={() => {
                        dispatch(placesActions.deleteVolunteer(phoneNumber));
                        props.navigation.navigate('Places');
                    }}
                />
            </View>
        </ScrollView>
    );
};

export const screenOptions = () => {
    return {
        headerTitle: 'Delete Screen'
    };
};

const styles = StyleSheet.create({
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 10,
    },
    phoneNumber: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20
    },
    question: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 30
    }
});

export default DeleteScreen;
