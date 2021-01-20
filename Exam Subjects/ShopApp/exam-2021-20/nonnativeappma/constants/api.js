import { SERVER_URL } from './constants';

const volunteerUrl = SERVER_URL;


const axios = require('axios');

const config = (url, method, body) =>

	fetch(url, {
		method,
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(response => response.json());

export const fetchVolunteers = () => fetch('http://10.0.2.2:2020/items').then(res => res.json());

export const boughtItems = () => fetch('http://10.0.2.2:2020/bought').then(res => res.json());

export const fetchDN = () => fetch('http://10.0.2.2:2020/items').then(res => res.json());

export const fetchPaints = () => fetch('http://10.0.2.2:2702/locations').then(res => res.json());

export const fetchVolunteersLocation = ({ location }) => fetch('http://10.0.2.2:2702/files/' + location).then(res => res.json());

export const buyItems = (id) => config('http://10.0.2.2:2020/buy', 'POST', { id });

export const fetchVolunteersMe = ({ driver }) => fetch('http://10.0.2.2:2019/my/' + driver).then(res => res.json());

export const createVolunteer = (data) => config('http://10.0.2.2:2020/item', 'POST', data);

export const deleteVolunteerForm = ({ identifier }) => config('http://10.0.2.2:2020/item/' + identifier, 'DELETE', { identifier });

export const updateVolunteerForm = ({ identifier, name, status, passengers, driver, paint, capacity }) => { console.log("aaaaa", identifier), config(volunteerUrl, 'PUT', { identifier, name, status, passengers, driver, paint, capacity }) };