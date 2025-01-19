import React from 'react';

import './blocks/popup/popup.css';
import './blocks/popup/_is-opened/popup_is-opened.css';

function InfoTooltip({ isOpen, onClose, children }) {
  
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
          {children}
        </form>
      </div>
    </div>
  );

}

export default InfoTooltip;

 