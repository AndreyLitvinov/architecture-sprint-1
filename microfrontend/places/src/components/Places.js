import React, { useEffect, useState } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup.js';
import { useCurrentUserContext } from 'shared-contexts';

import api from "../utils/api.js";

import "../blocks/places/places.css";

function Places() {
  const [cards, setCards] =
    useState([]);

  const { currentUser } = useCurrentUserContext();

  const [selectedCard, setSelectedCard] = useState(null);


  function onCardClick(card) {
    setSelectedCard(card);
  }


  function closeAllPopups() {
    setSelectedCard(null);
  }



  function onCardLike(card) {

    const isLiked = card.likes.some((i) => i._id === currentUser.profile._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function onCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api
      .getCardList()
      .then((data) => {

        setCards(data);

      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddedPlace(event) {

    setCards((currentCards) => [event.detail, ...currentCards]);

  }

  useEffect(() => {
    addEventListener("place-added", handleAddedPlace);
    return () => removeEventListener("place-added", handleAddedPlace)
  }, []);

  return (<>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    <ul className="places__list">
      {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))}
    </ul>
  </>
  );
}

export default Places;
