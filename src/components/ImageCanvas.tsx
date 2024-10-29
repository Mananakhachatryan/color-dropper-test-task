import React from "react";

interface ImageCanvasProps {
  isDropping: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: () => void;
  onMouseEnter: () => void;
  onClick: (save: boolean) => void;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  canvasRef,
  isDropping,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  onClick,
}) => {
  return (
    <canvas
      ref={canvasRef}
      className={`border border-black ${
        isDropping ? "cursor-none" : "cursor-default"
      }`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={() => onClick(true)}
    />
  );
};

export default ImageCanvas;
