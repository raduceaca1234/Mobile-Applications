import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';

const NewPlaceScreen = props => {
  const [nameValue, setNameValue] = useState('');
  const [phoneNumberValue, setPhoneNumberValue] = useState('');

  const dispatch = useDispatch();

  const nameChangeHandler = text => {
    // you could add validation
    setNameValue(text);
  };

  const phoneChangeHandler = text => {
    // you could add validation
    setPhoneNumberValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(nameValue, phoneNumberValue));
    props.navigation.goBack();
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

NewPlaceScreen.navigationOptions = {
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

export default NewPlaceScreen;
