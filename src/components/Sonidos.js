import React from "react";
import { Link } from "react-router-dom";
import "./Sonidos.css";
import { audioData } from "../assets";

function Sonidos() {
  const playSound = (audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.play();
  };

  const pauseSound = (audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.pause();
  };

  return (
    <div>
      <div className="divCrear">
        <Link to="/">
          <button className="btnSonidos">Sprint</button>
        </Link>
      </div>
      <div className="container">
        <div className="container_cards">
          {audioData.map((audio) => (
            <div className="card" key={audio.id}>
              <img src={audio.image} onClick={() => playSound(audio.id)} alt="Play Sound" />
              <audio id={audio.id} src={audio.src}></audio>
              <p>{audio.name}</p>
              <button onClick={() => pauseSound(audio.id)}>Stop</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sonidos;