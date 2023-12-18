import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

/** Component uses deck API which allows the drawing of one card at a time */
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeckFromAPI() {
        async function fetchData() {
            const d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
            setDeck(d.data);
        }
        fetchData();
    }, []);

    // draw() and shuffle() change the card's state & implement the effect
    async function draw() {
        try {
            const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
            if (drawRes.data.remaining === 0) {
                throw new Error("Deck empty!");
            }

            const card = drawRes.data.cards[0];
            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image
                }
            ]);
        } catch (err) {
            alert(err);
        }
    }

    async function startsShuffling() {
        setIsShuffling(true);
        try {
            await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    // Render draw button (disabled if shuffling)
    function renderDrawBtnIfOk() {
        if (!deck) return null;

        return (
            <button onClick={draw} disabled={isShuffling}>
               DRAW
            </button>
        );
    }

    // Render shuffle button (disabled if shufling)
    function renderShuffleBtnIfOk() {
        if (!deck) return null;
        
        return (
            <button onClick={startsShuffling} disabled={isShuffling}>
                SHUFFLE DECK
            </button>
        );
    }

    return (
        <main>
            {renderDrawBtnIfOk()}
            {renderShuffleBtnIfOk()}
            <div>{
                drawn.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>
        </main>
    );
}

export default Deck;
