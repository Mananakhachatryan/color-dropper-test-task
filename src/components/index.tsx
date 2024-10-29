"use client";

import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./ToolBar";
import ImageUpload from "./ImageUpload";
import ImageCanvas from "./ImageCanvas";
import ColorIndicator from "./ColorIndicator";

const ColorDropper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [isMouseInside, setIsMouseInside] = useState(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const magnifierSize = 100;
  const zoomLevel = 2;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return null;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context || !imageSrc) return;
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const windowWidth = window.innerWidth * 0.9;
      const windowHeight = window.innerHeight * 0.9;
      const aspectRatio = img.width / img.height;

      // Calculate the appropriate canvas dimensions
      const canvasWidth = Math.min(windowWidth, windowHeight * aspectRatio);
      const canvasHeight = canvasWidth / aspectRatio;

      if (canvas) {
        canvas.width = canvasWidth; // set canvas width
        canvas.height = canvasHeight; // set canvas height

        context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        context.drawImage(img, 0, 0, canvas.width, canvas.height); // draw image on canvas
      }
    };
  }, [imageSrc]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDropping && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse X position
      const y = e.clientY - rect.top; // mouse Y position

      const context = canvasRef.current.getContext("2d");
      if (context) {
        const pixelData = context.getImageData(x, y, 1, 1).data; // pixel color data
        const hexColor = `#${(
          (1 << 24) +
          (pixelData[0] << 16) +
          (pixelData[1] << 8) +
          pixelData[2]
        )
          .toString(16)
          .slice(1)}`; // convert to hex color
        setPickedColor(hexColor);
        setMousePos({ x, y });
      }
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setIsMouseInside(false);
  };

  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };

  const handleMouseClick = (save: boolean) => {
    if (!save || isDropping) {
      setIsDropping(!isDropping);
    }

    if (isDropping && save) {
      setSelectedColor(pickedColor);
    }
  };

  return (
    <div className="relative h-screen flex justify-center items-center">
      <Toolbar
        imageSrc={imageSrc}
        handleMouseClick={handleMouseClick}
        isDropping={isDropping}
        selectedColor={selectedColor}
      />
      {!imageSrc ? (
        <ImageUpload
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleImageUpload={handleImageUpload}
        />
      ) : (
        <>
          <ImageCanvas
            canvasRef={canvasRef}
            isDropping={isDropping}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={handleMouseClick}
          />
          {mousePos && isDropping && isMouseInside && (
            <ColorIndicator
              mousePos={mousePos}
              canvasRef={canvasRef}
              pickedColor={pickedColor}
              magnifierSize={magnifierSize}
              zoomLevel={zoomLevel}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ColorDropper;
