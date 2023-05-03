import mongoose from 'mongoose';

export default connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	} catch (error) {
		console.error(error);
	}
};
