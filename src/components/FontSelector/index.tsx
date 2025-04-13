const fonts = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Courier New", value: "Courier New, monospace" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Comic Sans MS", value: "Comic Sans MS, cursive" },
];

const FontSelector = ({ selectedFont, onSelect }: any) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Police de caractères
      </label>
      <select
        value={selectedFont}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
