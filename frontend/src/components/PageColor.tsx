import { ColorPicker, useColor } from "react-color-palette";
import { useState } from "react";
import "react-color-palette/css";

interface PageColorProps {
  backgroundColor: string | null;
  setTextColor: React.Dispatch<React.SetStateAction<string | null>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PageColor: React.FC<PageColorProps> = ({
  backgroundColor,
  setTextColor,
  setBackgroundColor,

}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useColor(backgroundColor || "yellow");

  return (
    <div>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>Picker</button>
      {showColorPicker && (
        <ColorPicker
          color={color}
          onChange={(newColor) => {
            console.log(newColor);
            setColor(newColor);
            setBackgroundColor(`${newColor.hex}`); 
            setTextColor(`${newColor.hex}`);
          }}
        />
      )}
    </div>
  );
};