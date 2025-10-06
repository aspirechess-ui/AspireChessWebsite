const mongoose = require('mongoose');
const Program = require('../models/Program');
require('dotenv').config();

const seedPrograms = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing programs
    await Program.deleteMany({});
    console.log('Cleared existing programs');

    // Sample programs data
    const programs = [
      {
        branch: "Kalamboli Branch",
        location: "Main Branch",
        batches: [
          {
            type: "Weekday Batch",
            schedule: "Monday & Thursday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          },
          {
            type: "Weekend Batch",
            schedule: "Saturday & Sunday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          }
        ],
        features: [
          "Personal coach assignment",
          "Progress tracking",
          "Practice games",
          "Study materials"
        ],
        colorTheme: "green",
        whatsappNumber: "+917039184939",
        displayOrder: 0,
        isActive: true
      },
      {
        branch: "Kamothe Branch",
        location: "Associated with Vibe House Studio",
        batches: [
          {
            type: "Weekday Batch",
            schedule: "Monday & Thursday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          },
          {
            type: "Weekend Batch",
            schedule: "Saturday & Sunday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          }
        ],
        features: [
          "Group coaching",
          "Interactive sessions",
          "Game analysis",
          "Tournament prep"
        ],
        colorTheme: "blue",
        whatsappNumber: "+917039184939",
        displayOrder: 1,
        isActive: true
      },
      {
        branch: "Roadpali Branch",
        location: "Associated with Rhythm Revolution Studio",
        batches: [
          {
            type: "Weekday Batch",
            schedule: "Monday & Thursday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          },
          {
            type: "Weekend Batch",
            schedule: "Saturday & Sunday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          }
        ],
        features: [
          "Professional coaching",
          "Tactical training",
          "Position analysis",
          "Opening theory"
        ],
        colorTheme: "purple",
        whatsappNumber: "+917039184939",
        displayOrder: 2,
        isActive: true
      },
      {
        branch: "Online Mode",
        location: "Learn from Anywhere",
        batches: [
          {
            type: "Weekday Batch",
            schedule: "Monday & Thursday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          },
          {
            type: "Weekend Batch",
            schedule: "Saturday & Sunday",
            slots: [
              { time: "8-9 AM", level: "Beginner Level" },
              { time: "9-10 AM", level: "Advanced Level" }
            ]
          }
        ],
        features: [
          "1-on-1 coaching",
          "Flexible timings",
          "Digital resources",
          "Online tournaments"
        ],
        colorTheme: "orange",
        whatsappNumber: "+917039184939",
        displayOrder: 3,
        isActive: true
      }
    ];

    // Insert programs
    await Program.insertMany(programs);
    console.log(`Successfully seeded ${programs.length} programs`);

  } catch (error) {
    console.error('Error seeding programs:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seeder
if (require.main === module) {
  seedPrograms();
}

module.exports = seedPrograms;