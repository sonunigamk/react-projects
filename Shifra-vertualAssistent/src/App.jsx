import React, { useContext, useEffect } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import UserContext, { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"


const App = () => {

const { recognition, speaking,setSpeaking,prompt,setPrompt,response,setResponse } = useContext(datacontext);

  return (
    <div className="main">
      <img src={va} alt="" id='shifra'/>
      <span>I'm Shifra, Your Advance Virtual Assistant</span>
      {!speaking?
      <button onClick={()=>{
        setPrompt("listening...")
        setSpeaking(true)
        setResponse(false)
        recognition.start();
      }}>Click here <CiMicrophoneOn /> </button>
      :
      <div className='bottom-div'> 
      {!response? 
      <img src={speakimg} alt=""  id='speak-img'/>
      :
       <img src={aigif} alt=""  id='aigif'/>
      }
      
       <p>{prompt}</p>
      </div>
      
    }
      
    </div>
  )
}

export default App