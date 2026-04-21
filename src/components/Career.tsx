import "./styles/Career.css";
import { experience } from "../data/portfolioData";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experience.map((exp) => (
            <div className="career-info-box" key={exp.id}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{exp.period}</h3>
              </div>
              <p>
                {exp.achievements.join(". ")}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
