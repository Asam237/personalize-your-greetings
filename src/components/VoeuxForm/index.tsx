import { useState } from "react";
import ColorPicker from "../ColorPicker";
import FontSelector from "../FontSelector";
import SocialShare from "../SocialShare";
import MessagePreview from "../MessagePreview";

const VoeuxForm = () => {
  const [voeuxType, setVoeuxType] =
    useState<keyof typeof voeuxTypes>("mariage");
  const [age, setAge] = useState(30);
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [generatedMessage, setGeneratedMessage] = useState("");

  const voeuxTypes = {
    mariage: "Wedding",
    anniversaire: "Birthday",
    deces: "Death",
    nouvel_an: "New Year",
  };

  const generateMessage = () => {
    let message = "";

    switch (voeuxType) {
      case "mariage":
        message = `Best wishes on your wedding${
          name ? `, ${name}` : ""
        }!\nMay this new chapter of your life be filled with endless love, joy, and laughter.\nWishing you a marriage full of understanding, shared dreams, and beautiful memories.\nCongratulations and all the happiness in the world`;
        break;
      case "anniversaire":
        message = `Happy ${age}th Birthday${
          name ? `, ${name}` : ""
        }!\nWishing you happiness, health, and success.\nMay this year bring amazing opportunities.\nKeep shining and chasing your dreams.\nEnjoy your special day to the fullest! 🎉`;

        break;
      case "deces":
        message = `In loving memory ${
          name ? `of, ${name}` : ""
        }, Gone too soon but never forgotten.\nMay their soul rest in eternal peace.\nOur thoughts and prayers are with the family.\nTheir kindness and spirit will live on forever.`;
        break;

      case "nouvel_an":
        message = `🎉 Happy New Year ${new Date().getFullYear()}!\nWishing you joy, success, and good health.\nMay this year bring new opportunities your way.\nKeep dreaming, keep growing, keep shining.\nCheers to a bright and beautiful year ahead! ✨`;
        break;
      default:
        message = "Meilleurs vœux pour cette occasion spéciale!";
    }

    setGeneratedMessage(message);
  };

  const clearMessage = () => {
    setGeneratedMessage("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Personalize your greetings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Customization options
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of request
                </label>
                <select
                  value={voeuxType}
                  onChange={(e) => {
                    setVoeuxType(e.target.value as keyof typeof voeuxTypes);
                    clearMessage();
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {Object.entries(voeuxTypes).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {voeuxType === "anniversaire" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Âge
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => {
                      setAge(parseInt(e.target.value));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                    max="120"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fullname (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter a name"
                />
              </div>
              <ColorPicker
                label="Text color"
                color={textColor}
                onChange={(color: any) => {
                  setTextColor(color);
                }}
              />
              <FontSelector
                selectedFont={fontFamily}
                onSelect={(font: any) => {
                  setFontFamily(font);
                }}
              />
              <button
                onClick={generateMessage}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate message
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <MessagePreview
              message={generatedMessage}
              backgroundColor={backgroundColor}
              textColor={textColor}
              fontFamily={fontFamily}
              type={voeuxType}
            />

            {generatedMessage && (
              <div className="mt-6">
                <SocialShare
                  message={generatedMessage}
                  voeuxType={voeuxTypes[voeuxType]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoeuxForm;
