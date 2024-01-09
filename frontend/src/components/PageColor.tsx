import { ColorPicker, useColor } from "react-color-palette";
import { useState } from "react";
import "react-color-palette/css";

interface PageColorProps {
  backgroundColor: string | null;
  onChange: (color: string) => void;
}

export const PageColor: React.FC<PageColorProps> = ({
  backgroundColor,
  onChange,

}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useColor(backgroundColor || "orange");

  return (
    <div>
      <button className="shadow-sm px-3 py-3" onClick={() => setShowColorPicker(!showColorPicker)}>Picker</button>
      {showColorPicker && (
        <ColorPicker
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
            onChange(newColor.hex);
          }}
        />
      )}
    </div>
  );
};