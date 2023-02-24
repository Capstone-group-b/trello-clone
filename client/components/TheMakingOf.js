import React from 'react';

function TheMakingOf() {
  return (
    <div>
      {' '}
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/n22nj-ZxQcI"
          title="Embedded video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default TheMakingOf;
