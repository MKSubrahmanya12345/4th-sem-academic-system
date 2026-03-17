const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const Subject = require('./models/Subject');

const audit = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const subs = await Subject.find().select('name credits');
        console.log('--- DATABASE SUBJECTS ---');
        let total = 0;
        subs.sort((a,b) => b.credits - a.credits).forEach(s => {
            console.log(`- ${s.name}: ${s.credits} Cr`);
            total += s.credits;
        });
        console.log('-------------------------');
        console.log(`GRAND TOTAL: ${total} CREDITS`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
audit();
