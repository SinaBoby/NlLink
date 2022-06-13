import cityTour from "../images/city-tour.jpg";
import museum from "../images/museum.jpg";
import food from "../images/food.jpg";
import language from "../images/language.jpg";
import music from "../images/music.jpg";
import sport from "../images/sport.jpg";
import training from "../images/training.jpg";
import volunteerWork from "../images/volunteer-work.jpg";

const getCategoryImageUrl = (category) => {
  const categoryName = category.replace(/\s+/g, "-").toLowerCase();

  switch (categoryName) {
    case "city-tour":
      return cityTour;
    case "museum":
      return museum;
    case "food":
      return food;
    case "language":
      return language;
    case "music":
      return music;
    case "sport":
      return sport;
    case "training":
      return training;
    case "volunteer-work":
      return volunteerWork;
  }
};

export default getCategoryImageUrl;
