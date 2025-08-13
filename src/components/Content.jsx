import React from 'react';

const Content = () => {
  return (
    <div>
      <h1>Introduction to Game Theory</h1>
      <p>
        Game theory is the study of mathematical models of strategic interaction among rational decision-makers.
        It has applications in all fields of social science, as well as in logic, systems science and computer science.
        Originally, it addressed zero-sum games, in which one person's gains result in losses for the other participants.
        Today, game theory applies to a wide range of behavioral relations, and is now an umbrella term for the science
        of logical decision making in humans, animals, and computers.
      </p>

      <h2>Veritasium: The Prisoner's Dilemma</h2>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src="https://www.youtube.com/embed/iSNsgj1OCLA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <p>
        The Prisoner's Dilemma is a canonical example of a game analyzed in game theory that shows why two completely
        rational individuals might not cooperate, even if it appears that it is in their best interests to do so.
      </p>
    </div>
  );
};

export default Content;
