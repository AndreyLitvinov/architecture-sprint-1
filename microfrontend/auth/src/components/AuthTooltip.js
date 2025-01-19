import React from 'react';

import SuccessIcon from '../images/components/success-icon.svg';
import ErrorIcon from '../images/components/error-icon.svg';

import { InfoTooltip } from 'shared-components';

function AuthTooltip({ isOpen, onClose, status }) {
  
  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const text = status === 'success' ? "Вы успешно зарегистрировались" :
    "Что-то пошло не так! Попробуйте ещё раз."

  return (

    <InfoTooltip isOpen={isOpen} onClose={onClose} >
      <div>
        <img className="popup__icon" src={icon} alt="" />
        <p className="popup__status-message">{text}</p>
      </div>
    </InfoTooltip>

  );
}

export default AuthTooltip;

