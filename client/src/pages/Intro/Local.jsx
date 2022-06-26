import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInfo } from "../../../../server/src/util/logging.js";
import TEST_ID from "../Home/Home.testid";
import "./Intro.css";
import newComerHeader from "../../images/newcomerIntro.jpg";
import Button from "../../components/Button";
import newBegin from "../../images/new-begin-desktop.jpg";
import chatting from "../../images/chatting-desktop.jpg";
import party from "../../images/party-desktop.jpg";
//import * as Scroll from "react-scroll";
import {
  Link as ScrollLink,
  Button as ScrollButton,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

const Local = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) {
      logInfo("begin", arguments);
      logInfo(to, element);
    });

    Events.scrollEvent.register("end", function (to, element) {
      logInfo("end", arguments);
      logInfo(to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <>
      <header className="header" data-testid={TEST_ID.container}>
        <div className="header-hero-container">
          <img src={newComerHeader} className="hero" alt="newcomerHeader" />
        </div>
        <div className="header-btn-col">
          <h1 className="title mobile-mt">Introduction for locals</h1>
          <ScrollLink
            activeClass="active"
            className="btn"
            to="connections"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            delay={500}
          >
            Connections
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            className="btn"
            to="activities"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            delay={500}
          >
            Activities
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            className="btn"
            to="news"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            delay={500}
          >
            News
          </ScrollLink>
          <Button onClick={() => navigate("/newcomerIntro")} className="btn">
            Guide for newcomer users
          </Button>
          <Link className="btn" to="/">
            Back to Home
          </Link>
        </div>
      </header>
      <main>
        <section className="feature" id="connections">
          <div className="feature-img-container">
            <img src={newBegin} alt="Connections-Intro" />
          </div>
          <div className="feature-description">
            <h2 className="title">
              Make connections with Newcomers Based on your Interests
            </h2>
            <p className="feature-para">
              In <em>Connect to newcomers</em> section, local users can find
              matches among newcomers based on their same interests or needs and
              start a conversation with them. or either receive messages from
              other newcomers who are interested to start a conversation with
              them. They would always be happy if a local help them in learning
              the Dutch language or tell them how everything works in the
              Netherlands or even find new friends.
            </p>
            <Link className="btn btn-intro" to="/connect">
              Sign in & make your connections
            </Link>
          </div>
        </section>
        <section className="feature flip element" id="activities">
          <div className="feature-description">
            <h2 className="title">
              Any plans for an activity?... Why doing it alone then?!
            </h2>
            <p className="feature-para">
              In the <em>Activities</em> section, you can create new activities
              and events in different categories and let other users join in
              your planned activity, or join another user`s created activities
              and events. It could be any interesting social event from planning
              a coffee meeting or a lovely party to making new friends!. This is
              the best way to learn about different cultures and socialize with
              new people.
            </p>
            <Link className="btn btn-intro" to="/activities">
              Sign in & make your activities
            </Link>
          </div>
          <div className="feature-img-container">
            <img src={chatting} alt="Activities-Intro" />
          </div>
        </section>
        <section className="feature" id="news">
          <div className="feature-img-container">
            <img src={party} alt="News-Intro" />
          </div>
          <div className="feature-description">
            <h2 className="title">Being on top of the News</h2>
            <p className="feature-para">
              In the <em>News</em> section, you get the latest News related to
              your life matters in the Netherlands. You can be on top of the
              latest Immigration and refugees News. Also, we introduce talented
              and successful refugees in the Netherlands who could make a nice
              impact on the host society.
            </p>
            <Link className="btn btn-intro" to="/news">
              Sign in & get latest news
            </Link>
            <ScrollButton
              activeClass="active"
              className="btn"
              readOnly
              value="Back to top"
              onClick={() => scroll.scrollToTop()}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              delay={500}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Local;
