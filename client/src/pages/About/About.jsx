import React, { useState } from "react";
import hero from "../../images/aboutmainphoto.jpeg";
import bashar from "../../images/bashar.jpg";
import sina from "../../images/sinaboby.jpeg";
import burak from "../../images/burak.jpg";
import MemberInfo from "../../components/MemberInfo";
import "./About.css";

const team_info = {
  bashar: {
    name: "Bashar Khdr",
    occupation: "Full Stack Developer",
    description:
      "I am Bashar from Syria. I hold a Master Degree in Data science. After jumping back and forth among different fields in IT. I landed on Frontend development",
    github: "https://github.com/BasharKhdr1992",
    linkedin: "https://www.linkedin.com/in/bashar-khdr-a07087193/",
  },
  burak: {
    name: "Burak Özmen",
    occupation: "Full Stack Developer",
    description:
      "Full-Stack Web Development student at HackYourFuture, from Turkey and living in the Netherlands",
    github: "https://github.com/brkzmn",
    linkedin: "https://www.linkedin.com/in/burak-%C3%B6zmen/",
  },
  sina: {
    name: "Sina Gholipour",
    occupation: "Full Stack Developer",
    description:
      "Web Development Student in Hack You Future Coding School, working with and learning: JavasCript, NodeJs, MySQL, MongoDB, React.",
    github: "https://github.com/SinaBoby",
    linkedin: "https://www.linkedin.com/in/sinagholipour/",
  },
};

const About = () => {
  const [memberSelected, setMemberSelected] = useState("sina");

  return (
    <div className="about-wrapper">
      <section className="about-header">
        <div className="about-img-wrapper">
          <img src={hero} alt="about us hero" />
        </div>
        <div className="our-mission">
          <h1 className="about-title">What is our mission?</h1>
          <p className="about-p">
            People who were forced to leave their own countries for the wrong
            reasons and deserve a new beginning have found a safe place in the
            Netherlands, and full of opportunities. Our mission is to help new
            comers connect to people that have already gone through a lot during
            their integration phase and introduce them to a lot of opportunities
            to help them get up to speed, and set them up on the right way to
            achieve what they aim at.
          </p>
          <blockquote className="about-quot">
            &quot; Destiny have chosen many life breaking points for us. From
            now on, we make our destiny &quot;
          </blockquote>
          <div className="about-quot-author">NILink Team</div>
        </div>
      </section>
      <section className="our-team">
        <div
          className={`member-card ${
            memberSelected === "sina" ? "member-selected" : undefined
          }`}
          onClick={() => setMemberSelected("sina")}
        >
          <img src={sina} alt="sina" />
        </div>
        <div
          className={`member-card ${
            memberSelected === "burak" ? "member-selected" : undefined
          }`}
          onClick={() => setMemberSelected("burak")}
        >
          <img src={burak} alt="burak" />
        </div>
        <div
          className={`member-card ${
            memberSelected === "bashar" ? "member-selected" : undefined
          }`}
          onClick={() => setMemberSelected("bashar")}
        >
          <img src={bashar} alt="bashar" />
        </div>
      </section>
      <MemberInfo member={team_info[memberSelected]} />
    </div>
  );
};

export default About;
