// Settings.tsx
import React from 'react';

interface GallerySettingsProps {
  carouselSpeed: number;
  setCarouselSpeed: (speed: number) => void;
  fetchInterval: number;
  setFetchInterval: (interval: number) => void;
}

const GallerySettings: React.FC<GallerySettingsProps> = ({
  carouselSpeed,
  setCarouselSpeed,
  fetchInterval,
  setFetchInterval
}) => {

  
  return (
    <div className="settingsDiv">
      <div>
        <button className="optionsButton button" onClick={() => window.location.reload()}>
          Reload
        </button>
        <button className="optionsButton button" onClick={() => document.documentElement.requestFullscreen()}>
          Fullscreen
        </button>
      </div>

      <div className="hubbenrattanSettings">
        <h3>Hubbenråttan Displaytime:</h3>
        <div className="inputDiv">
          <input
            type="number"
            min="1"
            max="60"
            defaultValue={(carouselSpeed / 1000).toString()}
            onChange={setFetchInterval(carouselSpeed * 1000)}
          />
          <label>sec</label>
        </div>
      </div>
      <div>
        <h3>Fetch Interval:</h3>
        <div className="inputDiv">
          <input
            type="number"
            min="1"
            max="59"
            defaultValue={(fetchInterval / (60 * 1000)).toString()}
            onChange={handleFetchIntervalChange}
          />
          <label>min</label>
        </div>
      </div>
    </div>
  );
};

export default GallerySettings;
