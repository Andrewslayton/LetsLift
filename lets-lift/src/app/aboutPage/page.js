"use client"
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const AboutMe = () => {
  const [sectionVisibility, setSectionVisibility] = useState({});

  const toggleSection = (section) => {
    setSectionVisibility({
      ...sectionVisibility,
      [section]: !sectionVisibility[section],
    });
  };

  return (
    <div className={styles.parentCenter}>
      <div className={styles.aboutText}>
        <section onClick={() => toggleSection("aboutLetslift")}>
          <h2 className={styles.aboutSectionHead}>
            About Letslift
            <br />
            <FontAwesomeIcon icon={faCaretDown} />
          </h2>
          {sectionVisibility["aboutLetslift"] && (
            <p>
              Letslift is an app that helps you find people to lift with. This
              website was developed using next.js and deployed on vercel.
              <br />
              warning: this app will display your email to other users.
            </p>
          )}
        </section>
        <section onClick={() => toggleSection("howToUseLetslift")}>
          <div>
            <h2 className={styles.aboutSectionHead}>
              How to Use Letslift
              <br />
              <FontAwesomeIcon icon={faCaretDown} />
            </h2>
          </div>
          {sectionVisibility["howToUseLetslift"] && (
            <p>
              To use Letslift, follow these steps:
              <p>
                {" "}
                1. Sign in using a google account
                <br />
                2. Select a location by typing in the "enter address" box and
                selecting a location from the dropdown. A marker will appear at
                the location selected. You must click on the marker.
                <br />
                3. Select a lift(s) by clicking on the lift buttons.
                <br />
                4. Click the find lifters button and you will be redirected to a
                page with a list of users that match your criteria.
                <br />
                5. Click on the users name to send them an email. If you are on
                IOS or have outlook set up you can then click on the users name
                to send them an email. If not you can copy their email and send
                them an email manually.
                <br />
                6. If there are no matches tell a friend about the app and check
                back later!
              </p>
            </p>
          )}
        </section>

        <section onClick={() => toggleSection("contactingLifters")}>
          <h2 className={styles.aboutSectionHead}>
            Contacting Lifters
            <br />
            <FontAwesomeIcon icon={faCaretDown} />
          </h2>
          {sectionVisibility["contactingLifters"] && (
            <p>
              If you are on IOS or have outlook set up you can then click on the
              users name to send them an email. If not you can copy their email
              and send them an email manually. Your email will be displayed for
              users to contact you as well.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
