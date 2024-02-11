import { useState } from "react";
import "./App.css";
import SecondPage from "./component/SecondPage";
import WelcomePage from "./component/WelcomePage";

function App() {
  const [isFormPage, setIsFormPage] = useState(false);
  const [clicked, setClicked] = useState(null);
  const handleClicked = (data) => {
    setClicked(data)
  }
  const handleFormPage = (data) => {
    setIsFormPage(data)
  }
  console.log("clicked value", clicked)
  return (
    <div className="App">
      {isFormPage && <SecondPage id={clicked.id} uploadImage= {clicked.uploadImage} handleFormPage = {handleFormPage}/>}
      {!isFormPage && <WelcomePage setClicked = {handleClicked} setIsFormPage = {setIsFormPage} />}
    </div>
  );
}

export default App;
