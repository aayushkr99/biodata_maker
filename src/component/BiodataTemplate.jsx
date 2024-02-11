import React, { useEffect } from 'react';

const BiodataTemplate = ({ html }) => {
  useEffect(() => {
    const container = document.getElementById('biodata-container');
    if (container) {
      container.innerHTML = html;

      // Adjust styles to fit within the 400px by 400px box
      const content = container.querySelector('.container');
      if (content) {
        content.style.maxWidth = '100%';
        content.style.height = '5%';
        content.style.transform = 'scale(0.4)'; // Adjust the scale factor as needed
        content.style.borderLeft = '5px solid #360202';
      }
    }
  }, [html]);

  return (
    <div
      id="biodata-container"
      style={{
        width: '300px',
        height: '400px',
        overflow: 'hidden',
        border: '1px solid #ddd',
        margin: '10px',
        backgroundColor: '#f5f5f5',
      }}
    />
  );
};

export default BiodataTemplate;
