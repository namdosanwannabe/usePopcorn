import React from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleButton = ({ isOpen, setIsOpen }: Props) => {
    return (
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
    );
};
export default ToggleButton;
