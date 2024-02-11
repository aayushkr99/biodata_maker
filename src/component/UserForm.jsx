import React, { useState } from 'react';
import style from '../styling/UserForm.module.css';


const initialState = {
  id: "0",
  name: '',
  fathersName: '',
  mothersName: '',
  caste: '',
  gothra: '',
  complexion: '',
  height: "",
  dob: '',
  education: '',
  hobby: '',
  occupation: '',
  address: '',
  contactNumber: '',
};

const UserForm = ({id, uploadImage, handleFormPage}) => {
  console.log(id, uploadImage)
  const [formData, setFormData] = useState(initialState);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value,  "id": id, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (profilePicture) {
      const formDataWithImage = new FormData();
      formDataWithImage.append('profilePicture', profilePicture);
  
      for (const [key, value] of Object.entries(formData)) {
        formDataWithImage.append(key, value);
      }
      console.log(formData)
      try {
        const response = await fetch('http://localhost:5000/biodata/image', {
          method: 'POST',
          body: formDataWithImage,
        });
  
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
  
        setTimeout(async () => {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `biodata${formData.name}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },1000)
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/biodata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }

        setTimeout(async () => {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `biodata${formData.name}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
         },1000);

      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  
    setFormData(initialState);
    setProfilePicture(null);
    
    setTimeout(() => {
      alert('BioData Downloaded Sucessfully....')
      handleFormPage(false);
     },1500);

  };
  
  const profilePictureStyles = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    margin: '20px 0',
    overflow: 'hidden',
  //  position: 'relative', // Add position relative for ::after pseudo-element
  };
  
  if (uploadImage) {
    profilePictureStyles.backgroundColor = 'rgb(196, 247, 198)';
    profilePictureStyles.border = '3px solid pink';
  }

  return (
    <div className={style['user-form']}>
      <button style={{backgroundColor: "#006D5B", color: "white", margin : "4px", padding: "2px"}} onClick={() => {handleFormPage(false)}}>go back</button>
      <form onSubmit={handleSubmit} className={style.formlayout} encType="multipart/form-data">
        <div className={style.profilePicture} style={profilePictureStyles}>
          {uploadImage && <label>
            {profilePicture ? (
              <img src={URL.createObjectURL(profilePicture)} alt="Profile" />
            ) : (
              <span>Choose File</span>
            )}
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className={style.input}
            />
          </label>}
        </div>
        <div className={style.form}>
        <label className={style.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            className={style.input}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Father's Name:
          <input
            type="text"
            name="fathersName"
            value={formData.fathersName}
            className={style.input}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Mother's Name:
          <input
            type="text"
            name="mothersName"
            value={formData.mothersName}
            className={style.input}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Caste:
          <input
            type="text"
            name="caste"
            value={formData.caste}
            className={style.input}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Gothra:
          <input
            type="text"
            name="gothra"
            value={formData.gothra}
            className={style.input}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Complexion:
          <input
            type="text"
            name="complexion"
            value={formData.complexion}
            className={style.input}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Height:
          <input
            type="text"
            name="height"
            value={formData.height}
            className={style.input}
            onChange={handleChange}
          />
        </label>
        
        <label className={style.label}>
          DOB:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            className={style.input}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Education:
          <input
            type="text"
            name="education"
            value={formData.education}
            className={style.input}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Hobby:
          <input
            type="text"
            name="hobby"
            className={style.input}
            value={formData.hobby}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Occupation:
          <input
            type="text"
            name="occupation"
            className={style.input}
            value={formData.occupation}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Address:
          <textarea
          className={style.textarea}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Contact Number:
          <input
            type="tel"
            name="contactNumber"
            pattern="[0-9]{10}"
            className={style.input}
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>

        <button className={style.button} type="submit" encType="multipart/form-data">Submit / Download</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;