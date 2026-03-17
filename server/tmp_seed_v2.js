const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const User = require('./models/User');
const Semester = require('./models/Semester');
const Subject = require('./models/Subject');
const Mark = require('./models/Marks');

const seedV2 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('??$$$ MongoDB Linked for Phase 2 Injection...');

    const user = await User.findOne();
    if (!user) {
        console.error('No operator found.');
        process.exit(1);
    }
    
    let semester = await Semester.findOne({ userId: user._id });
    if (!semester) {
        semester = await Semester.create({ userId: user._id, name: 'SEMESTER 4', subjects: [] });
    }

    // List of subjects to add
    const subjectsToDeploy = [
        {
            name: 'MP',
            credits: 3,
            components: [
                { name: 'mse1', maxMarks: 20, weight: 0.20 },
                { name: 'mse2', maxMarks: 20, weight: 0.20 },
                { name: 'task1', maxMarks: 4, weight: 0.04 },
                { name: 'task2', maxMarks: 4, weight: 0.04 },
                { name: 'task3', maxMarks: 2, weight: 0.02 },
                { name: 'SEE', maxMarks: 100, weight: 0.50 }
            ],
            marks: [
                { component: 'mse1', score: 16 },
                { component: 'task1', score: 3 }
            ]
        },
        {
            name: 'SEPM',
            credits: 3,
            components: [
                { name: 'mse1', maxMarks: 20, weight: 0.20 },
                { name: 'mse2', maxMarks: 20, weight: 0.20 },
                { name: 'task1', maxMarks: 4, weight: 0.04 },
                { name: 'task2', maxMarks: 4, weight: 0.04 },
                { name: 'task3', maxMarks: 2, weight: 0.02 },
                { name: 'SEE', maxMarks: 100, weight: 0.50 }
            ],
            marks: [
                { component: 'mse1', score: 15 },
                { component: 'task1', score: 4 }
            ]
        },
        {
            name: 'DBMS',
            credits: 3,
            components: [
                { name: 'mse1', maxMarks: 15, weight: 0.15 },
                { name: 'mse2', maxMarks: 15, weight: 0.15 },
                { name: 'Project', maxMarks: 20, weight: 0.20 },
                { name: 'SEE', maxMarks: 100, weight: 0.50 }
            ],
            marks: [
                { component: 'mse1', score: 15 }
            ]
        },
        {
            name: 'ESC',
            credits: 2,
            components: [
                { name: 'mse1', maxMarks: 20, weight: 0.20 },
                { name: 'mse2', maxMarks: 20, weight: 0.20 },
                { name: 'task1', maxMarks: 4, weight: 0.04 },
                { name: 'task2', maxMarks: 4, weight: 0.04 },
                { name: 'task3', maxMarks: 2, weight: 0.02 },
                { name: 'SEE', maxMarks: 100, weight: 0.50 }
            ],
            marks: []
        },
        {
            name: 'UNIX LAB',
            credits: 1,
            components: [
                { name: 'mse1', maxMarks: 20, weight: 0.20 },
                { name: 'mse2', maxMarks: 20, weight: 0.20 },
                { name: 'record', maxMarks: 10, weight: 0.10 },
                { name: 'see', maxMarks: 40, weight: 0.40 },
                { name: 'viva', maxMarks: 10, weight: 0.10 }
            ],
            marks: [
                { component: 'mse1', score: 20 }
            ]
        },
        {
            name: 'DAA LAB',
            credits: 1,
            components: [
                { name: 'mse1', maxMarks: 20, weight: 0.20 },
                { name: 'mse2', maxMarks: 20, weight: 0.20 },
                { name: 'record', maxMarks: 10, weight: 0.10 },
                { name: 'see', maxMarks: 40, weight: 0.40 },
                { name: 'viva', maxMarks: 10, weight: 0.10 }
            ],
            marks: []
        },
        {
            name: 'MP LAB',
            credits: 1,
            components: [
                { name: 'mse1', maxMarks: 20, weight: 0.20 },
                { name: 'mse2', maxMarks: 20, weight: 0.20 },
                { name: 'record', maxMarks: 10, weight: 0.10 },
                { name: 'see', maxMarks: 40, weight: 0.40 },
                { name: 'viva', maxMarks: 10, weight: 0.10 }
            ],
            marks: []
        },
        {
            name: 'DBMS LAB',
            credits: 1,
            components: [
                { name: 'mse1', maxMarks: 15, weight: 0.15 },
                { name: 'mse2', maxMarks: 15, weight: 0.15 },
                { name: 'project', maxMarks: 20, weight: 0.20 },
                { name: 'record', maxMarks: 10, weight: 0.10 },
                { name: 'see', maxMarks: 30, weight: 0.30 },
                { name: 'viva', maxMarks: 10, weight: 0.10 }
            ],
            marks: []
        }
    ];

    for (const sub of subjectsToDeploy) {
        // Clear existing to avoid ID conflicts
        await Subject.deleteMany({ userId: user._id, name: sub.name });
        
        const createdSub = await Subject.create({
            userId: user._id,
            semesterId: semester._id,
            name: sub.name,
            credits: sub.credits,
            components: sub.components
        });

        if (!semester.subjects.includes(createdSub._id)) {
            semester.subjects.push(createdSub._id);
        }

        if (sub.marks && sub.marks.length > 0) {
            await Mark.deleteMany({ userId: user._id, subjectId: createdSub._id });
            const markObjects = sub.marks.map(m => ({
                userId: user._id,
                subjectId: createdSub._id,
                componentName: m.component,
                obtainedMarks: m.score
            }));
            await Mark.create(markObjects);
        }
    }

    await semester.save();
    console.log('??$$$ System Update Complete: 8 New Subjects Initialized.');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedV2();
