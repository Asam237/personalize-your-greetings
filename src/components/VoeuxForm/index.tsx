// components/GreetingGenerator.tsx
"use client";

import { useState } from "react";
import {
  Heart,
  Gift,
  Star,
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
} from "lucide-react";

interface VoeuxType {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface Font {
  name: string;
  class: string;
}

type VoeuxTypeKey = "mariage" | "anniversaire" | "deces" | "nouvel_an";

const GreetingGenerator: React.FC = () => {
  const [voeuxType, setVoeuxType] = useState<VoeuxTypeKey>("mariage");
  const [age, setAge] = useState<number>(30);
  const [name, setName] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#667eea");
  const [fontFamily, setFontFamily] = useState<string>("Inter");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const voeuxTypes: Record<VoeuxTypeKey, VoeuxType> = {
    mariage: {
      label: "Wedding",
      icon: Heart,
      gradient: "from-pink-400 to-red-500",
    },
    anniversaire: {
      label: "Birthday",
      icon: Gift,
      gradient: "from-purple-400 to-pink-500",
    },
    deces: {
      label: "Memorial",
      icon: Star,
      gradient: "from-gray-400 to-blue-500",
    },
    nouvel_an: {
      label: "New Year",
      icon: Sparkles,
      gradient: "from-yellow-400 to-orange-500",
    },
  };

  const fonts: Font[] = [
    { name: "Inter", class: "font-sans" },
    { name: "Serif", class: "font-serif" },
    { name: "Mono", class: "font-mono" },
    { name: "Cursive", class: "font-serif italic" },
  ];

  const colorPresets: string[] = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#f5576c",
    "#4facfe",
    "#43e97b",
    "#fa709a",
    "#ffecd2",
  ];

  const generateMessage = (): void => {
    let message = "";

    switch (voeuxType) {
      case "mariage":
        message = `✨ Congratulations on your wedding${
          name ? `, ${name}` : ""
        }! ✨\n\nMay this beautiful journey be filled with endless love, joy, and laughter. Here's to a lifetime of shared dreams, precious moments, and unwavering happiness.\n\nWishing you both all the love in the world! 💕`;
        break;
      case "anniversaire":
        message = `🎉 Happy ${age}th Birthday${
          name ? `, ${name}` : ""
        }! 🎉\n\nAnother year of amazing adventures, beautiful memories, and incredible growth! May this new chapter bring you endless joy, exciting opportunities, and all your heart desires.\n\nKeep shining bright and chasing your dreams! ✨`;
        break;
      case "deces":
        message = `🕊️ In loving memory${
          name ? ` of ${name}` : ""
        } 🕊️\n\nGone from our sight, but never from our hearts. Their beautiful spirit, kindness, and love will forever live on in the lives they touched.\n\nMay they rest in eternal peace, and may their memory be a blessing to all who knew them. 💙`;
        break;
      case "nouvel_an":
        message = `🎊 Happy New Year ${new Date().getFullYear()}! 🎊\n\nAs we step into this new chapter, may it be filled with boundless joy, incredible adventures, and dreams coming true. Here's to new beginnings, fresh opportunities, and endless possibilities!\n\nCheers to a year of growth, love, and amazing memories! ✨🥂`;
        break;
      default:
        message = "Best wishes for this special occasion! ✨";
    }

    setGeneratedMessage(message);
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadAsImage = (): void => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, backgroundColor);
    gradient.addColorStop(1, backgroundColor + "80");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = textColor;
    ctx.font = `24px ${fontFamily}`;
    ctx.textAlign = "center";

    const lines = generatedMessage.split("\n");
    const lineHeight = 40;
    const startY = (canvas.height - lines.length * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });

    // Download
    const link = document.createElement("a");
    link.download = "greeting-card.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareToSocial = (platform: string): void => {
    const text = encodeURIComponent(generatedMessage);
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      whatsapp: `https://wa.me/?text=${text}`,
    };

    const url = urls[platform.toLowerCase() as keyof typeof urls];
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const currentType = voeuxTypes[voeuxType];
  const IconComponent = currentType.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
            Greeting Card Creator
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Create beautiful, personalized messages for life&apos;s special
            moments
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customization Panel */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                Customize Your Message
              </h2>

              <div className="space-y-6">
                {/* Greeting Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Occasion Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(voeuxTypes).map(([key, value]) => {
                      const Icon = value.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setVoeuxType(key as VoeuxTypeKey);
                            setGeneratedMessage("");
                          }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                            voeuxType === key
                              ? `bg-gradient-to-r ${value.gradient} text-white border-transparent shadow-lg transform scale-105`
                              : "border-gray-200 hover:border-purple-300 bg-white hover:shadow-md"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{value.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Age Input for Birthday */}
                {voeuxType === "anniversaire" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 focus:outline-none"
                      min="1"
                      max="120"
                    />
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 focus:outline-none"
                    placeholder="Enter recipient's name"
                  />
                </div>

                {/* Color Picker */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Background Color
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        onClick={() => setBackgroundColor(color)}
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                          backgroundColor === color
                            ? "border-gray-800 scale-110"
                            : "border-white hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-12 rounded-full border-4 border-white cursor-pointer"
                      aria-label="Custom color picker"
                    />
                  </div>
                </div>

                {/* Font Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Font Style
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setFontFamily(font.name)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          fontFamily === font.name
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        } ${font.class}`}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-gray-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-100"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateMessage}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  ✨ Generate Beautiful Message
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  Preview
                </h2>

                {/* Message Preview */}
                <div
                  className="rounded-2xl p-8 min-h-[300px] flex items-center justify-center text-center relative overflow-hidden shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}CC)`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  {generatedMessage ? (
                    <div
                      className="relative z-10 leading-relaxed text-lg max-w-md"
                      style={{
                        color: textColor,
                        fontFamily:
                          fontFamily === "Inter"
                            ? "ui-sans-serif, system-ui"
                            : fontFamily === "Serif"
                            ? "ui-serif, serif"
                            : fontFamily === "Mono"
                            ? "ui-monospace, monospace"
                            : "serif",
                      }}
                    >
                      {generatedMessage.split("\n").map((line, index) => (
                        <div key={index} className="mb-2">
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-lg">
                      Click &quot;Generate Beautiful Message&quot; to create
                      your greeting!
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {generatedMessage && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy Text"}
                    </button>
                    <button
                      onClick={downloadAsImage}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Share Section */}
            {generatedMessage && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Your Creation
                </h3>
                <p className="mb-4 opacity-90">
                  Spread joy by sharing your beautiful message with others!
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {["Facebook", "Twitter", "WhatsApp"].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => shareToSocial(platform)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingGenerator;
