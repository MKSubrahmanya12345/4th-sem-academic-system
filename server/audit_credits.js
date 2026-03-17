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
        const user = await User.findOne({ email: 'mksubbu007@gmail.com' });
        if (!user) process.exit(1);

        const subs = await Subject.find({ userId: user._id });
        console.log(`\nSUBJECT AUDIT FOR ${user.email}:`);
        console.log('-----------------------------------');
        let total = 0;
        subs.forEach(s => {
            console.log(`${s.name}: ${s.credits} Credits`);
            total += s.credits;
        });
        console.log('-----------------------------------');
        console.log(`TOTAL CALCULATED CREDITS: ${total}`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
audit();
