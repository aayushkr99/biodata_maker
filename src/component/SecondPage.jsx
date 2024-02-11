import React from 'react';
import Header from './Header';
import UserForm from './UserForm';

const SecondPage = ({id, uploadImage, handleFormPage}) => {
  console.log(id, uploadImage)
  return (
    <div style={{display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',backgroundImage: `url('https://t4.ftcdn.net/jpg/06/76/58/25/240_F_676582550_rrKlkruuWLcJgDZQN4lk7ByCOMGiguF3.jpg')`,
    backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh'
    }}>
     <div style={{ margin: "0px", padding: "15px" }}>
        <Header />
        <UserForm id= {id} uploadImage={uploadImage} handleFormPage= {handleFormPage} />
      </div>
    </div>
  );
}

export default SecondPage;
