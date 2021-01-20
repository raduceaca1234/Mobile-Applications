import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import VolunteersListScreen from '../screens/VolunteersListScreen';
import VolunteerDetailScreen from '../screens/VolunteerDetailScreen';
import NewVolunteerScreen from '../screens/NewVolunteerScreen';
import DeleteScreen from '../screens/DeleteScreen';
import UpdateScreen from '../screens/UpdateScreen';
import MainScreen from '../screens/MainScreen';
import PaintList from '../screens/PaintList';
import FilteredVechicles from '../screens/VechiclesWithPaint';
import SecondMainScreen from '../screens/SecondMainScreen';
import Top10Vechicles from '../screens/Top10Vechicles';
import Top10Drivers from '../screens/Top10Drivers';
import Top5Cars from '../screens/Top5Cars';
import ThirdMainScreen from '../screens/ThirdMainScreen';
import RecordDriverName from '../screens/RecordDriverName';
import AllVechicles from '../screens/AllVechicles';
import DesiredOrNeeded from '../screens/DesiredOrNeeded';
import Buy from '../screens/Buy';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
    {
        MainScreen: MainScreen,
        SecondMainScreen: SecondMainScreen,
        ThirdMainScreen: ThirdMainScreen,
        Buy: Buy,
        DesiredOrNeeded: DesiredOrNeeded,
        AllVechicles: AllVechicles,
        RecordDriverName: RecordDriverName,
        Top10Vechicles: Top10Vechicles,
        Top10Drivers: Top10Drivers,
        Top5Cars: Top5Cars,
        Volunteers: VolunteersListScreen,
        Paints: PaintList,
        FilteredVechicles: FilteredVechicles,
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
