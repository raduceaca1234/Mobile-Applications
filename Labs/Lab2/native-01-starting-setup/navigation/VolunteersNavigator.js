import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import DeleteScreen from '../screens/DeleteScreen';
import UpdateScreen from '../screens/UpdateScreen';

import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
    {
        Places: PlacesListScreen,
        PlaceDetail: PlaceDetailScreen,
        NewPlace: NewPlaceScreen,
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
