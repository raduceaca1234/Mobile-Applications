import React, { useState, useCallback } from 'react';

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
import { insertName } from '../helpers/db';

const RecordDriverName = props => {
  const [nameValue, setNameValue] = useState('');
  
  const dispatch = useDispatch();

  const nameChangeHandler = text => {
    // you could add validation
    setNameValue(text);
  };

  const isAvailable = (data) => {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 300, 'Request timed out');
    });

    const request = fetch('http://10.0.2.2:5000/vechicles/vechicle');

    return Promise
      .race([timeout, request])
      .then(response => {
        alert('Action is supported in the server :)')
        fetch("http://10.0.2.2:5000/vechicles/vechicle", {
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
          }
        );
      })
      .catch(error => {
        Alert.alert(
          'Action is not supported in the server, only in the local db'
        ),
          dispatch({ type: ADD_OPERATION, name: "createVolunteer", data: data })
        dispatch(placesActions.loadVolunteersFromDb())
        props.navigation.goBack()
      });
  }


  const savePlaceHandler = async () => {
    dispatch(placesActions.addName(nameValue));
    props.navigation.goBack()
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
        <Button
          title="Save Name"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

RecordDriverName.navigationOptions = {
  headerTitle: 'Add Name'
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

export default RecordDriverName;
