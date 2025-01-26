import React, { useState } from 'react';
import AddPlacePopup from './AddPlacePopup';

import api from "../utils/api.js";

function AddPlace() {

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
    }

    function onAddPlace() {
        setIsAddPlacePopupOpen(true);
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {

                dispatchEvent(new CustomEvent("place-added", {

                    detail: newCardFull

                }));

                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    return (<>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>,
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
        />
    </>
    )

}


export default AddPlace;