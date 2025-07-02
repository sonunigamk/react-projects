import React, { createContext, useState } from "react";
import run from "../gemini";

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening...");
  const [response, setResponse] = useState(false);

function speak(text) {
  if (!text) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.volume = 1;
  utter.rate = 1;
  utter.pitch = 1;
  utter.lang = "hi-GB";

  // Cancel anything already speaking
  window.speechSynthesis.cancel();

  // Show AI speaking animation
  setSpeaking(true);
  setResponse(true);

  // When speaking ends, reset everything
  utter.onend = () => {
    setSpeaking(false);
    setResponse(false);
    setPrompt("Click the mic to talk again");
  };

  setTimeout(() => {
    window.speechSynthesis.speak(utter);
  }, 100);
}


  async function aiResponse(prompt) {
    let text = await run(prompt);

    // Remove markdown formatting and replace words
    let cleanedText = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/google/gi, "Sonu Kumar");

   
   // Match up to the second punctuation (., !, ?)
const matches = cleanedText.match(/.*?[.!?](\s+.*?[.!?])?/);

// Take full first sentence + second if available
const finalText = matches ? matches[0] : cleanedText;

    setPrompt(finalText);
    speak(finalText);
    setResponse(true);

    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening YouTube");
      setResponse(true);
      setPrompt("Opening YouTube...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("Opening Google");
      setResponse(true);
      setPrompt("Opening Google...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("linkedin")) {
      window.open("https://www.linkedin.com/", "_blank");
      speak("Opening LinkedIn");
      setResponse(true);
      setPrompt("Opening LinkedIn...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening Instagram");
      setResponse(true);
      setPrompt("Opening Instagram...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("chat gpt")) {
      window.open("https://chat.openai.com/", "_blank");
      speak("Opening ChatGPT");
      setResponse(true);
      setPrompt("Opening ChatGPT...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("twitter")) {
      window.open("https://www.twitter.com/", "_blank");
      speak("Opening Twitter");
      setResponse(true);
      setPrompt("Opening Twitter...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("whatsapp")) {
      window.open("https://web.whatsapp.com/", "_blank");
      speak("Opening WhatsApp Web");
      setResponse(true);
      setPrompt("Opening WhatsApp...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("open") && command.includes("github")) {
      window.open("https://github.com/", "_blank");
      speak("Opening GitHub");
      setResponse(true);
      setPrompt("Opening GitHub...");
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setPrompt(time);
      setResponse(true);
      setTimeout(() => setSpeaking(false), 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setPrompt(date);
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext;
