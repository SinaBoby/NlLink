import News from "../models/News.js";

const newsData = [
  {
    title: "Civic integration in 2022",
    content:
      "The Civic Integration Act aims to help you learn the Dutch language and to prepare you for studying or working in the Netherlands. The municipality will help you find the right civic integration programme and guide you throughout the civic integration process. Once this process is complete, you can start studying or working at your level. ",
    sources: ["https://www.uaf.nl/en/en-for-refugees/civic-integration/"],
    category: "refugees",
  },
  {
    title: "Dutch labour crisis",
    content:
      "The Netherlands continues to face a growing shortage of workers, with recent figures published by Statistics Netherlands (CBS) revealing the extent of the national labour crisis. In the first quarter of this year, the Dutch unemployment rate reached its lowest level in almost 20 years, while the number of job vacancies continued to rise.",
    sources: [
      "https://www.iamexpat.nl/career/employment-news/dutch-labour-crisis-worsens-number-job-vacancies-continues-rise",
    ],
    category: "finance",
  },
];

const seedNewsCollection = async () => {
  await News.deleteMany({});
  await News.insertMany(newsData);
};

export default seedNewsCollection;
