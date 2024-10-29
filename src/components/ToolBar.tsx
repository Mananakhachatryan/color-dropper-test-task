import React from "react";
import colorDropperIcon from "../assets/img/IconColorPicker.svg";
import Image from "next/image";

interface ToolbarProps {
  imageSrc: string | null;
  handleMouseClick: (save: boolean) => void;
  isDropping: boolean;
  selectedColor: string | null;
}

const Toolbar: React.FC<ToolbarProps> = ({
  imageSrc,
  handleMouseClick,
  isDropping,
  selectedColor,
}) => {
  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center bg-gray-300 bg-opacity-80 border-2 border-gray-400 p-2 rounded z-10 w-80 h-15">
      <div
        onClick={imageSrc ? () => handleMouseClick(false) : undefined}
        className={`w-10 h-10 rounded flex justify-center items-center cursor-${
          imageSrc ? "pointer" : "not-allowed"
        } ${
          isDropping ? "bg-black bg-opacity-20" : "bg-transparent"
        } transition-opacity duration-200`}
      >
        <Image
          src={colorDropperIcon}
          alt="Color Dropper"
          className={`w-6 h-6 ${isDropping ? "filter invert" : ""}`}
        />
      </div>
      {selectedColor && (
        <>
          <div
            style={{ backgroundColor: selectedColor }}
            className="w-6 h-6 border-2 border-gray-400 rounded ml-2"
          />
          <span className="ml-2 font-bold">{selectedColor}</span>
        </>
      )}
    </div>
  );
};

export default Toolbar;
