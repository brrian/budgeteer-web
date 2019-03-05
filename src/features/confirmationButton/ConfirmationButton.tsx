import React, { SFC, useState, MouseEvent } from 'react';

interface ConfirmationButton {
  classNames?: string;
  handleClick: () => void;
  label: string;
}

const ConfirmationButton: SFC<ConfirmationButton> = ({
  classNames = '',
  handleClick,
  label,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (clicked) {
      handleClick();
    } else {
      setClicked(true);
    }
  };

  const text = !clicked ? label : 'Confirm';

  return (
    <button className={`button ${classNames}`} onClick={handleButtonClick}>
      {text}
    </button>
  );
};

export default ConfirmationButton;
