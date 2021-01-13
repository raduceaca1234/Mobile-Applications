import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import VolunteersListScreen from '../screens/VolunteersListScreen';
import VolunteerDetailScreen from '../screens/VolunteerDetailScreen';
import NewVolunteerScreen from '../screens/NewVolunteerScreen';
import DeleteScreen from '../screens/DeleteScreen';
import UpdateScreen from '../screens/UpdateScreen';

import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
    {
        Volunteers: VolunteersListScreen,
        VolunteerDetail: VolunteerDetailScreen,
        NewVolunteer: NewVolunteerScreen,
        DeleteScreen: DeleteScreen,
        UpdateScreen: UpdateScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
);

export default createAppContainer(PlacesNavigator);
