// YourReactComponent.tsx
import React from 'react';
import { destinationType } from './ChatInterface';

const YourReactComponent = () => {
  const renderDestinationType = () => {
    let line1, line2;

    switch (destinationType) {
      case "beach":
        line1 = "Welcome to the beautiful beach!";
        line2 = "Enjoy the sun, sand, and surf.";
        break;
      case "mountain":
        line1 = "Experience the breathtaking views of the mountains!";
        line2 = "Find peace and tranquility in the mountainous landscapes.";
        break;
      // Add cases for other destination types
      default:
        line1 = "Explore the wonders of our destination!";
        line2 = "Discover new adventures and experiences.";
        break;
    }

    return (
      <div>
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
    );
  };

  return (
    <div>
      {renderDestinationType()}
    </div>
  );
};

export default YourReactComponent;
export default YourReactComponent;
