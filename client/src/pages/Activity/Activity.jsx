import React, { useState } from "react";
import "./Activity.css";
import activityHero from "../../images/activity-hero.jpg";
import Select from "../../components/Forms/Select";

const Activity = () => {
  const [activityCategory, setActivityCategory] = useState("all");

  return (
    <div className="activity-page-container">
      <div
        className="create-activity-wrapper"
        style={{
          backgroundImage: `url(${activityHero})`,
        }}
      ></div>
      <div className="activity-category-select-wrapper">
        <Select
          value={activityCategory}
          onChange={(e) => {
            setActivityCategory(e.target.value);
          }}
          options={[
            { value: "All", text: "Choose a category" },
            { value: "Language", text: "Language" },
          ]}
        />
      </div>
    </div>
  );
};

export default Activity;
