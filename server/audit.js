const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');
const Semester = require('./models/Semester');
const Subject = require('./models/Subject');

const audit = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find();
        console.log(`System Users: ${users.length}`);
        for (const u of users) {
            const sems = await Semester.find({ userId: u._id });
            const subs = await Subject.find({ userId: u._id });
            console.log(`- User: ${u.email} | Sems: ${sems.length} | Subs: ${subs.length}`);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
audit();
