import mongoose, { Schema } from 'mongoose';

const VolunteerSchema = new Schema(
	{
		id: String,
		name: String,
		phoneNumber: String,
		date: Date
	},
	{
		timestamps: true
	}
);

export default mongoose.model('Volunteer', VolunteerSchema);
