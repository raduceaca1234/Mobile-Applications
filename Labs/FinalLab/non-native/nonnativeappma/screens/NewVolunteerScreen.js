import React, { useState, useCallback } from 'react';
import { ADD_OPERATION } from '../store/volunteers-actions';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import moment from "moment";

import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers } from '../constants/api';
import { insertVolunteer } from '../helpers/db';

const NewVolunteerScreen = props => {
  const [nameValue, setNameValue] = useState('');
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const currentDate = new Date();
  const dispatch = useDispatch();

  const nameChangeHandler = text => {
    // you could add validation
    setNameValue(text);
  };

  const phoneChangeHandler = text => {
    // you could add validation
    setPhoneNumberValue(text);
  };

  const isAvailable = (data) => {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 300, 'Request timed out');
    });

    const request = fetch('http://10.0.2.2:5000/volunteers');

    return Promise
      .race([timeout, request])
      .then(response => {
        alert('It worked :)')
        fetch("http://10.0.2.2:5000/volunteers", {
          method: "POST",
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res) => {
          dispatch(placesActions.loadVolunteersFromDb());
          props.navigation.goBack();
        }).catch(
          (err) => {
            console.log("errorrrrrr: ", err)
            // Alert.alert(
            //   'Action is not supported in the server, only in the local db'
            // ),
            // console.log("pullla")
            //   dispatch({ type: ADD_OPERATION, name: "createVolunteer", data: data }),
            //   dispatch(placesActions.loadVolunteersFromDb()),
            //   props.navigation.goBack()
          }
        );
      })
      .catch(error => {
        alert('It timed out :(')
        Alert.alert(
          'Action is not supported in the server, only in the local db'
        ),
          console.log("pullla")
        dispatch({ type: ADD_OPERATION, name: "createVolunteer", data: data })
        dispatch(placesActions.loadVolunteersFromDb())
        props.navigation.goBack()
      });
  }


  const savePlaceHandler = async () => {
    const today = currentDate;
    const date = moment(today).format("MMMM D, YYYY");

    const dbResult = await insertVolunteer(
      nameValue,
      phoneNumberValue,
      date
    );
    const data = {
      id: dbResult.insertId, name: nameValue, phoneNumber: phoneNumberValue, date: date
    }
    isAvailable(data)



    // if (await isAvailable === false) {
    //   Alert.alert(
    //     'Action is not supported in the server, only in the local db'
    //   ),
    //     console.log("pullla")
    //   dispatch({ type: ADD_OPERATION, name: "createVolunteer", data: data }),
    //     dispatch(placesActions.loadVolunteersFromDb()),
    //     props.navigation.goBack()
    // }
    // else {
    //   fetch("http://10.0.2.2:5000/volunteers", {
    //     method: "POST",
    //     cache: 'no-cache',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   }).then((res) => {
    //     dispatch(placesActions.loadVolunteersFromDb());
    //     props.navigation.goBack();
    //   }).catch(
    //     (err) => {
    //       console.log("errorrrrrr: ", err)
    //       // Alert.alert(
    //       //   'Action is not supported in the server, only in the local db'
    //       // ),
    //       // console.log("pullla")
    //       //   dispatch({ type: ADD_OPERATION, name: "createVolunteer", data: data }),
    //       //   dispatch(placesActions.loadVolunteersFromDb()),
    //       //   props.navigation.goBack()
    //     }
    //   );
    // }
    console.log("data: ", data);

  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={nameChangeHandler}
          value={nameValue}
        />
        <Text style={styles.label}>Phonenumber</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={phoneChangeHandler}
          value={phoneNumberValue}
        />
        <Button
          title="Save Volunteer"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewVolunteerScreen.navigationOptions = {
  headerTitle: 'Add Volunteer'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewVolunteerScreen;
