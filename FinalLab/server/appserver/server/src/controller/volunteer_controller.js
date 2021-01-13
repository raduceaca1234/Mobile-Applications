import Volunteer from '../models/Volunteer';

export const createVolunteer = (req, res) => {
	const { id, name, phoneNumber, date } = req.body;
	const newTweet = new Volunteer({ id, name, phoneNumber, date });

	newTweet
		.save()
		.then(() => Volunteer.find())
		.then(val => res.json(val));
};

export const viewVolunteer = (req, res) => {
	Volunteer.find().then(() => {
		Volunteer.find().then(val => res.json(val));
	});
};

export const deleteVolunteer = (req, res) => {
	const { id } = req.body;
	Volunteer.deleteOne({ "id": id }).then(val => {
		Volunteer.find().then(val => res.json(val));
	});
};

export const updateVolunteer = (req, res) => {
	const { id, name, phoneNumber, date } = req.body;
	var myquery = { "id": id };
	console.log(myquery);
	var newvalues = { $set: {"name": name, "phoneNumber": phoneNumber, "date": date} };
	Volunteer.updateOne(myquery, newvalues, ).then(val => {
		Volunteer.find().then(val => res.json(val));
	});
};
