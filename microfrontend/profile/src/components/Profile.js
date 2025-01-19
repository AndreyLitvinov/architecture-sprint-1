import React, { useState } from 'react';
import { CurrentUserProfileContext } from "./CurrentUserProfileContext.js";

import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import api from "../utils/api.js";

import "../blocks/profile/profile.css";


function Profile() {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    const onEditProfile = () => {
        setIsEditProfilePopupOpen(true);
    };

    const onEditAvatar = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const imageStyle = { backgroundImage: `url(${currentUserProfile.avatar})` };

    React.useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setCurrentUserProfile(userData);

                dispatchEvent(new CustomEvent("user-profile-change", {

                    detail: userData

                }));

            })
            .catch((err) => console.log(err));
    }, []);

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {

                setCurrentUserProfile(newUserData);
                dispatchEvent(new CustomEvent("user-profile-change", {

                    detail: newUserData

                }));

                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUserProfile(newUserData);
                dispatchEvent(new CustomEvent("user-profile-change", {

                    detail: newUserData

                }));
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
    };

    return (
        <CurrentUserProfileContext.Provider value={currentUserProfile}>
            <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUserProfile.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__description">{currentUserProfile.about}</p>
            </div>
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
            />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
            />
        </CurrentUserProfileContext.Provider>
    );
}

export default Profile;
