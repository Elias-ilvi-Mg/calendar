import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import { GoogleLogin } from 'react-google-login';
import axios from "axios" 

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const responseGoogle = response => {
    console.log(response)
    const {code} = response 
    axios
    .post('/api/create-tokens', {code})
    .then(response => {
      console.log(response.data)
      setSignedIn(true)
    })
    .catch(error => console.log (error.message))
  }

  const responseError = error => {
    console.log(error)
  }

// const handleSubmit = (e) =>{
//   e.preventDefault()
//   // console.log(summary, description, location, startDateTime, endDateTime)
//   axios.post('/api/create-event', {
    
//   })
//   .then(response => {
//     console.log(response.data)
//     setSignedIn(true)
//   })
// }

const [signedIn, setSignedIn] = useState(false)

  return (
    <React.Fragment>
      <div className="App">
      </div>
      {
        signedIn ? (
        <div className="container">
          <GoogleLogin  clientId= '380267844668-kads6f4jnk58bqbbirav72c21lc0ri92.apps.googleusercontent.com'
          buttonText="sign in & Authorize Calender"
          onSuccess={responseGoogle}
          onFailure={responseError}
          coockiePolicy={'single_host_origin'}
          
          responseType="code"
          accessType="offline"
          scope="openid email profile https://www.googleapis.com/auth/calendar"
          />
        <h1 className="signInText"> <b>Sign in to Continue</b></h1>
        </div>
        ) : (    
      <div className="h-screen flex flex-col">
      <CalendarHeader />
      <div className="flex flex-1">
        <Sidebar />
        <Month month={currenMonth} />
      </div>
    </div>
        )
      }
      
      
      {showEventModal && <EventModal />}

    </React.Fragment>
  );
}

export default App;
