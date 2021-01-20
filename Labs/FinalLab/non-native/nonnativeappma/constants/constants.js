import { Platform } from 'react-native';

const PORT = '5000';
const PATH = 'volunteers';

const android = `http://10.0.2.2:${PORT}/${PATH}`;
//PLEASE ENTER IP ADDRESS OF YOUR SYSTEM

const ios = `https://localhost:${PORT}/${PATH}`;

export const SERVER_URL = Platform.select({
	ios,
	android
});