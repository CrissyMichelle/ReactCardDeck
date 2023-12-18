import React, { useState } from "react";

function Card({ name, image }) {
    // fancy visual positioning of the card follows; only updates for a different card
    const [{ angle, xPos, yPos }] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20
    });
    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

    return (
        <img src={image} alt={name} style={{ transform }} />
    );
}

export default Card;
