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
    mariage: "Mariage",
    anniversaire: "Anniversaire",
    deces: "Décès",
    nouvel_an: "Nouvel An",
  };

  const generateMessage = () => {
    let message = "";

    switch (voeuxType) {
      case "mariage":
        message = `Best wishes on your wedding ${name ? `, ${name}` : ""}!
May this new chapter of your life be filled with endless love, joy, and laughter.
Wishing you a marriage full of understanding, shared dreams, and beautiful memories.
Congratulations and all the happiness in the world`;
        break;
      case "anniversaire":
        message = `Joyeux ${age}ème anniversaire${
          name ? `, ${name}` : ""
        }! Que cette nouvelle année de vie soit remplie de bonheur et de réussite.`;
        break;
      case "deces":
        message = `Nos plus sincères condoléances pour votre perte. Que ${
          name ? `${name}` : "votre proche"
        } repose en paix.`;
        break;
      case "nouvel_an":
        message = `Bonne année ${new Date().getFullYear()}! Que cette nouvelle année vous apporte santé, bonheur et prospérité.`;
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
          Personnalisez vos vœux
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Options de personnalisation
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de vœux
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
                      clearMessage(); // Clear the message
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                    max="120"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom (optionnel)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearMessage(); // Clear the message
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Entrez un nom"
                />
              </div>
              <ColorPicker
                label="Couleur du texte"
                color={textColor}
                onChange={(color: any) => {
                  setTextColor(color);
                  clearMessage(); // Clear the message
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
                Générer le message
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Aperçu</h2>
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
