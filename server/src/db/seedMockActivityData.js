import mongoose from "mongoose";
import Activity from "../models/Activity.js";

const activitiesData = [
  {
    title: "City Tour Activity",
    category: "Food",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-22"),
    endAt: new Date("2022-08-22"),
    description: "A beatiful city tour",
    joinedBy: [mongoose.Types.ObjectId("629d2140d0fac134a75d3c69")],
    location: {
      city: "Rotterdam",
      street: "Hooidrift",
      postCode: "1234AB",
    },
    maxPeople: 10,
  },
  {
    title: "Museum Tour",
    category: "Museum",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-09-15"),
    endAt: new Date("2022-09-15"),
    description: "A beatiful museum tour",
    joinedBy: [mongoose.Types.ObjectId("629d2140d0fac134a75d3c69")],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 15,
  },
  {
    title: "Keukenhof Tour",
    category: "City Tour",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-27"),
    endAt: new Date("2022-08-27"),
    description:
      "Visit the world's largest spring garden, and benefit from direct and easy travel from Amsterdam city center to Keukenhof Gardens. Bypass the lines and see the stunning flowers and floral displays at your own pace.",
    joinedBy: [mongoose.Types.ObjectId("629d2140d0fac134a75d3c69")],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 25,
  },
  {
    title: "Amsterdam Canal Cruise",
    category: "Sport",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-27"),
    endAt: new Date("2022-08-27"),
    description:
      "Cruise down the famous canals of Amsterdam during this 60-minute (for travel date before 1 July duration of 75 min) boat tour. Hop aboard the classic wooden saloon boat and sit back and enjoy the beautiful city pass you by. See landmarks while nibbling on Dutch cheese and having a drink.",
    joinedBy: [mongoose.Types.ObjectId("629d2140d0fac134a75d3c69")],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 35,
  },
  {
    title: "Amsterdam Canal Cruise",
    category: "Training",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-27"),
    endAt: new Date("2022-08-27"),
    description:
      "Cruise down the famous canals of Amsterdam during this 60-minute (for travel date before 1 July duration of 75 min) boat tour. Hop aboard the classic wooden saloon boat and sit back and enjoy the beautiful city pass you by. See landmarks while nibbling on Dutch cheese and having a drink.",
    joinedBy: [],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 35,
  },
  {
    title: "Amsterdam Canal Cruise",
    category: "Music",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-27"),
    endAt: new Date("2022-08-27"),
    description:
      "Cruise down the famous canals of Amsterdam during this 60-minute (for travel date before 1 July duration of 75 min) boat tour. Hop aboard the classic wooden saloon boat and sit back and enjoy the beautiful city pass you by. See landmarks while nibbling on Dutch cheese and having a drink.",
    joinedBy: [],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 35,
  },
  {
    title: "Amsterdam Canal Cruise",
    category: "Volunteer Work",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-27"),
    endAt: new Date("2022-08-27"),
    description:
      "Cruise down the famous canals of Amsterdam during this 60-minute (for travel date before 1 July duration of 75 min) boat tour. Hop aboard the classic wooden saloon boat and sit back and enjoy the beautiful city pass you by. See landmarks while nibbling on Dutch cheese and having a drink.",
    joinedBy: [],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 35,
  },
  {
    title: "Amsterdam Canal Cruise",
    category: "Language",
    createdBy: mongoose.Types.ObjectId("629d2140d0fac134a75d3c69"),
    startAt: new Date("2022-08-27"),
    endAt: new Date("2022-08-27"),
    description:
      "Cruise down the famous canals of Amsterdam during this 60-minute (for travel date before 1 July duration of 75 min) boat tour. Hop aboard the classic wooden saloon boat and sit back and enjoy the beautiful city pass you by. See landmarks while nibbling on Dutch cheese and having a drink.",
    joinedBy: [],
    location: {
      city: "Amsterdam",
      street: "museumplein",
      postCode: "6789BC",
    },
    maxPeople: 35,
  },
];

const seedActivityCollection = async () => {
  await Activity.deleteMany({});
  await Activity.insertMany(activitiesData);
};

export default seedActivityCollection;
