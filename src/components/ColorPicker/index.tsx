import { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ label, color, onChange }: any) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center">
        <div
          className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer mr-2"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <span className="text-sm">{color}</span>
      </div>

      {showPicker && (
        <div className="absolute z-10 mt-2">
          <ChromePicker
            color={color}
            onChangeComplete={(color: any) => {
              onChange(color.hex);
            }}
          />
          <button
            onClick={() => setShowPicker(false)}
            className="mt-2 text-sm text-blue-600"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
