import React, { useState, useEffect } from 'react';

const WelcomePage = ({setClicked, setIsFormPage}) => {
  const [templates, setTemplates] = useState([]);
  const handleImgClick = (value) => {
    console.log('clicked: ', value);
    setClicked(value);
    setIsFormPage(true)

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/biodata/sample', {
          method: 'GET',
        });

        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log(data.data);
        setTemplates(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
<div>
  <h1 style={{ textAlign: 'center', color: '#333', fontFamily: 'Arial, sans-serif', margin: '20px 0' }}>BIODATA BUILDER</h1>
  <div style={{ backgroundColor: 'orange', padding: '20px', textAlign: 'center' }}>
    <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '30px', marginBottom: '60px', fontFamily: 'Verdana, sans-serif' }}>
      Please choose the Marriage-related biodata template you'd like to use.
    </h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', minHeight: '100vh', margin: '20px auto' }}>
      {templates.map((template, index) => (
        <div key={index} id="html-content" style={{ margin: '10px', cursor: 'pointer' }}>
          <img
            src={template.template}
            alt={`${index + 1}`}
            style={{ width: '250px', height: '280px', borderRadius: '10px', transition: 'transform 0.3s ease-in-out' }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={() => handleImgClick({ id: template.id, uploadImage: template.showImage })}
          />
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  );
};

export default WelcomePage;