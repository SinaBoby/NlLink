import React from "react";
import TEST_ID from "./Home.testid";
import "./Home.css";
import heroDesktop from "../../images/hero-desktop.jpg";
import Button from "../../components/Button";
import newBegin from "../../images/new-begin-desktop.jpg";
import chatting from "../../images/chatting-desktop.jpg";
import party from "../../images/party-desktop.jpg";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <header className="header" data-testid={TEST_ID.container}>
        <div className="header-hero-container">
          <img src={heroDesktop} className="hero" alt="hero" />
        </div>
        <div className="header-btn-col">
          <h1 className="title mobile-mt">Welkom in Nederland</h1>
          <Button className={"btn-inline"} type="button">
            I&apos;m a local
          </Button>
          <Button className={"btn-inline"} type="button">
            I&apos;m a new comer
          </Button>
        </div>
      </header>
      <main>
        <section className="feature">
          <div className="feature-img-container">
            <img src={newBegin} alt="new begin" />
          </div>
          <div className="feature-description">
            <h2 className="title">Are you new in the Netherlands</h2>
            <p className="feature-para">
              Our App provides an easy way to connect to a wide group of people
              who are facing the same situation as an expat or local volunteers
              that are willing to help you set yourself on the right path
            </p>
          </div>
        </section>
        <section className="feature flip">
          <div className="feature-description">
            <h2 className="title">
              Still lost and do not know where to pick up ?
            </h2>
            <p className="feature-para">
              Customize your search based on what are interested in. Choose a
              connection and start chatting together.
            </p>
          </div>
          <div className="feature-img-container">
            <img src={chatting} alt="new begin" />
          </div>
        </section>
        <section className="feature">
          <div className="feature-img-container">
            <img src={party} alt="new begin" />
          </div>
          <div className="feature-description">
            <h2 className="title">Being lonely is not an option here</h2>
            <p className="feature-para">
              Host your own event or party, or simply go thourgh other events
              other users have created, and register your presence there.
            </p>
          </div>
        </section>
        <section className="testimonials-container">
          <h1 className="title">
            See what other people have said about our app
          </h1>
          <Testimonials />
        </section>
      </main>
    </>
  );
};

export default Home;
