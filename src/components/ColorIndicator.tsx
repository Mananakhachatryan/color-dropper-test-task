import React from "react";

interface ColorIndicatorProps {
  mousePos: { x: number; y: number };
  canvasRef: React.RefObject<HTMLCanvasElement>;
  pickedColor: string | null;
  magnifierSize: number;
  zoomLevel: number;
}

const ColorIndicator: React.FC<ColorIndicatorProps> = ({
  mousePos,
  canvasRef,
  pickedColor,
  magnifierSize,
  zoomLevel,
}) => {
  // function to draw the zoomed area on the magnifier canvas
  const drawMagnifier = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || !mousePos) return;

    const zoomContext = canvas.getContext("2d");
    const mainCanvas = canvasRef.current!.getContext("2d");
    if (!zoomContext || !mainCanvas) return;

    zoomContext.clearRect(0, 0, magnifierSize, magnifierSize);

    // calculate the source coordinates for the image to be drawn
    const sourceX = Math.max(0, mousePos.x - magnifierSize / (2 * zoomLevel));
    const sourceY = Math.max(0, mousePos.y - magnifierSize / (2 * zoomLevel));

    // draw the zoomed image from the main canvas onto the magnifier canvas
    zoomContext.drawImage(
      mainCanvas.canvas, // source canvas
      sourceX, // X coordinate of the image
      sourceY, // Y coordinate of the image
      magnifierSize / zoomLevel, // width of the source image to be drawn
      magnifierSize / zoomLevel, // height of the source image to be drawn
      0, // X coordinate on the magnifier canvas
      0, // Y coordinate on the magnifier canvas
      magnifierSize, // width on the magnifier canvas
      magnifierSize // height on the magnifier canvas
    );
  };
  return (
    <>
      <div
        className="absolute w-[50px] h-[50px] flex items-center justify-center z-20 pointer-events-none"
        style={{
          top:
            mousePos.y +
            (canvasRef.current?.getBoundingClientRect().top || 0) +
            4,
          left:
            mousePos.x +
            (canvasRef.current?.getBoundingClientRect().left || 0) +
            2,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="absolute w-[6px] h-[6px] top-1/2 left-1/2 pointer-events-none border border-white transform -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            backgroundColor: pickedColor || "transparent",
          }}
        />
        <span
          className="absolute bottom-[-10px] pt-[1px] px-[3px] pb-0 font-bold text-[8px] rounded-[5px] pointer-events-none z-40 bg-[rgba(255,255,255,0.7)]"
          style={{
            color: pickedColor || "black",
          }}
        >
          {pickedColor}
        </span>
      </div>

      <div
        className="flex items-center justify-center absolute z-10 cursor-none rounded-full overflow-hidden pointer-events-none"
        style={{
          top:
            mousePos.y -
            magnifierSize / 2 +
            (canvasRef.current?.getBoundingClientRect().top || 0),
          left:
            mousePos.x -
            magnifierSize / 2 +
            (canvasRef.current?.getBoundingClientRect().left || 0),
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
          border: `5px solid ${pickedColor}`,
        }}
      >
        <canvas
          width={magnifierSize}
          height={magnifierSize}
          className="absolute top-0 left-0 pointer-events-none cursor-none"
          style={{
            position: "absolute",
          }}
          ref={(canvas) => drawMagnifier(canvas)}
        />
      </div>
    </>
  );
};

export default ColorIndicator;
