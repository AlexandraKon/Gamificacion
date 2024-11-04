import React from "react";
import "./Cards.css";

function Cards() {
  const cardsData = [
    { color: "#FFDDC1", text: "I'm a funny card!", author: "by Alex" },
    { color: "#E1F7D5", text: "Why did the chicken...", author: "BY SANDRA" },
    { color: "#C9E4FF", text: "Keep smiling!", author: "by Charlie" },
    { color: "#FFE4E1", text: "I am hilarious!", author: "BY MICHAEL" },
    { color: "#FFF9C4", text: "Don't worry, be happy!", author: "by Emma" },
  ];

  return (
    <div className="container_cards">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="card cardHover"
          style={{ backgroundColor: card.color }}
        >
          <p>{card.text}</p>
          <div className="cardAuthor">{card.author}</div>
        </div>
      ))}
    </div>
  );
}

export default Cards;