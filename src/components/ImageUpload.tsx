import React from "react";

interface ImageUploadProps {
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  handleDrop,
  handleDragOver,
  handleImageUpload,
}) => {
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById("fileInput")?.click()}
      className="w-80 h-72 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer text-center opacity-80 hover:opacity-100 transition-opacity"
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <p>Drag and drop an image here or click to upload</p>
    </div>
  );
};

export default ImageUpload;
