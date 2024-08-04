const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User"); 
const Class = require("../models/Class");   
const Enrollment = require("../models/Enrollment");   

mongoose
  .connect("mongodb://localhost/elearning", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const createFakeUsers = async (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    const user = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: i % 2 === 0 ? "admin" : "user", // Alternate between admin and user roles
    });
    users.push(user);
  }
  await User.insertMany(users);
  console.log(`${num} users inserted`);
};

const createFakeClasses = async (num, instructors) => {
  const classes = [];
  for (let i = 0; i < num; i++) {
    const classItem = new Class({
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
      instructor:
        instructors[Math.floor(Math.random() * instructors.length)]._id,
    });
    classes.push(classItem);
  }
  await Class.insertMany(classes);
  console.log(`${num} classes inserted`);
};

const createFakeEnrollments = async (num, users, classes) => {
  const enrollments = [];
  for (let i = 0; i < num; i++) {
    const enrollment = new Enrollment({
      user: users[Math.floor(Math.random() * users.length)]._id,
      class: classes[Math.floor(Math.random() * classes.length)]._id,
    });
    enrollments.push(enrollment);
  }
  await Enrollment.insertMany(enrollments);
  console.log(`${num} enrollments inserted`);
};

const seedDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("Database cleared");

    await createFakeUsers(10);
    const users = await User.find();

    await createFakeClasses(
      5,
      users.filter((user) => user.role === "admin")
    );
    const classes = await Class.find();

    await createFakeEnrollments(
      20,
      users.filter((user) => user.role === "user"),
      classes
    );

    console.log("Database seeded");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
