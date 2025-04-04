import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LearningPlayground.css";

const LearningPlayground = () => {
  const { studyPlanId } = useParams();
  const [studyPlan, setStudyPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);

  const handleWordForest = () => {
    if (studyPlanId && selectedDay) {
      window.open(`/study-plan/${studyPlanId}/day/${selectedDay}`);
    }
  };

  const handleDailyTest = () => {
    if (studyPlanId && selectedDay) {
      window.open(`/daily-test/${studyPlanId}/day/${selectedDay}`);
    }
  };

  const handleDailyPractice = () => {
   
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/study-plan/${studyPlanId}`).then((res) => {
      setStudyPlan(res.data);
      console.log(res.data);
    });
  }, [studyPlanId]);

  return (
    <div className="learning-playground-container">
      {/* Header */}
      <header className="learning-playground-header">
        <div className="learning-playground-header-content">
          <h1 className="learning-playground-header-title">
            {studyPlan?.name || "Study Plan"}
          </h1>
          <div className="learning-playground-header-stats">
            <div className="learning-playground-stat-item">
              <span className="learning-playground-stat-label">Daily Goal</span>
              <span className="learning-playground-stat-value">
                {studyPlan?.daily_new_words} words
              </span>
            </div>
            <div className="learning-playground-stat-item">
              <span className="learning-playground-stat-label">
                Total Words
              </span>
              <span className="learning-playground-stat-value">
                {studyPlan?.total_words} words
              </span>
            </div>
            <div className="learning-playground-stat-item">
              <span className="learning-playground-stat-label">
                Current Streak
              </span>
              <span className="learning-playground-stat-value">
                {userData?.streak} days
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="learning-playground-main-content">
        {/* Left Sidebar - Days Navigation */}
        <nav className="learning-playground-sidebar">
          <div className="learning-playground-sidebar-inner">
            <h3 className="learning-playground-sidebar-title">
              Course Content
            </h3>
            <div className="learning-playground-days-list">
              {studyPlan &&
                Array.from(
                  { length: studyPlan.duration_days },
                  (_, i) => i + 1
                ).map((day) => (
                  <button
                    key={day}
                    className={`learning-playground-day-item ${
                      day === selectedDay ? "active" : ""
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <span className="learning-playground-day-number">
                      Day {day}
                    </span>
                    <span className="learning-playground-day-status"></span>
                  </button>
                ))}
            </div>
          </div>
        </nav>

        {/* Right Content Area */}
        <main className="learning-playground-content">
          <div className="learning-playground-content-header">
            <h2 className="learning-playground-day-title">Day {selectedDay}</h2>
            <span className="learning-playground-word-count">Todays Plan</span>
          </div>

          <div className="learning-playground-word-list">
            <div className="learning-playground-word-card">
              <div className="learning-playground-word-content">
                <h3 className="learning-playground-word-title">Words</h3>
                <button
                  className="learning-playground-learn-button"
                  onClick={handleWordForest}
                >
                  Start Learning
                </button>
              </div>
            </div>

            <div className="learning-playground-word-card">
              <div className="learning-playground-word-content">
                <h3 className="learning-playground-word-title">Practice</h3>
                <button
                  className="learning-playground-learn-button"
                  onClick={handleDailyPractice}
                >
                  Start Practice
                </button>
              </div>
            </div>

            <div className="learning-playground-word-card">
              <div className="learning-playground-word-content">
                <h3 className="learning-playground-word-title">Daily Test</h3>
                <button
                  className="learning-playground-learn-button"
                  onClick={handleDailyTest}
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearningPlayground;
