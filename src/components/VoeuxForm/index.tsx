import { useState } from "react";
import {
  Heart,
  Gift,
  Star,
  Sparkles,
  Copy,
  Check,
  Share2,
  Edit3,
  Palette,
  Download,
} from "lucide-react";

type GreetingType = "wedding" | "birthday" | "memorial" | "newyear" | "custom";

const GreetingGenerator = () => {
  const [type, setType] = useState<GreetingType>("wedding");
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [message, setMessage] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(18);
  const [fontStyle, setFontStyle] = useState("Inter");

  const greetingTypes = {
    wedding: { label: "Wedding", icon: Heart, color: "rose" },
    birthday: { label: "Birthday", icon: Gift, color: "purple" },
    memorial: { label: "Memorial", icon: Star, color: "slate" },
    newyear: { label: "New Year", icon: Sparkles, color: "amber" },
    custom: { label: "Custom", icon: Edit3, color: "blue" },
  };

  const colorPresets = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#f97316",
    "#84cc16",
  ];

  const fontStyles = ["Inter", "Serif", "Mono", "Cursive"];

  const generateMessage = () => {
    if (type === "custom") {
      setMessage(customMessage);
      return;
    }

    let newMessage = "";

    switch (type) {
      case "wedding":
        newMessage = `💕 Congratulations${
          name ? ` ${name}` : ""
        }!\n\nWishing you a lifetime filled with love, laughter, and endless happiness. May your journey together be everything you've dreamed of and more.\n\nWith love and best wishes! ✨`;
        break;
      case "birthday":
        newMessage = `🎉 Happy ${age}th Birthday${
          name ? ` ${name}` : ""
        }!\n\nHere's to another year of amazing adventures and beautiful memories. May this new chapter bring you joy, success, and everything your heart desires.\n\nCelebrate big! 🎂`;
        break;
      case "memorial":
        newMessage = `🤍 In loving memory${
          name ? ` of ${name}` : ""
        }\n\nThough they may be gone from our sight, they will never be forgotten. Their love, kindness, and beautiful spirit live on in our hearts forever.\n\nWith deepest sympathy and love 🕊️`;
        break;
      case "newyear":
        newMessage = `✨ Happy New Year ${new Date().getFullYear()}!\n\nMay this year bring new opportunities, beautiful moments, and dreams come true. Here's to fresh beginnings and endless possibilities!\n\nCheers to an amazing year ahead! 🥂`;
        break;
    }

    setMessage(newMessage);
  };

  const copyMessage = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const shareToSocial = (platform: string) => {
    if (!message) return;
    const text = encodeURIComponent(message);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${text}`,
      whatsapp: `https://wa.me/?text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`,
    };

    const url = urls[platform.toLowerCase() as keyof typeof urls];
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const downloadAsImage = () => {
    if (!message) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize + 6}px ${fontStyle}`;
    ctx.textAlign = "center";

    const lines = message.split("\n");
    const lineHeight = fontSize + 20;
    const startY = (canvas.height - lines.length * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });

    const link = document.createElement("a");
    link.download = "greeting-card.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const getColorClasses = (colorName: string, isSelected: boolean) => {
    const colors = {
      rose: isSelected
        ? "bg-rose-500 text-white scale-105"
        : "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-102",
      purple: isSelected
        ? "bg-purple-500 text-white scale-105"
        : "bg-purple-50 text-purple-600 hover:bg-purple-100 hover:scale-102",
      slate: isSelected
        ? "bg-slate-500 text-white scale-105"
        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-102",
      amber: isSelected
        ? "bg-amber-500 text-white scale-105"
        : "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:scale-102",
      blue: isSelected
        ? "bg-blue-500 text-white scale-105"
        : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-102",
    };
    return colors[colorName as keyof typeof colors] || colors.purple;
  };

  const getFontClass = (font: string) => {
    const fonts = {
      Inter: "font-sans",
      Serif: "font-serif",
      Mono: "font-mono",
      Cursive: "font-serif italic",
    };
    return fonts[font as keyof typeof fonts] || "font-sans";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl mb-6 transform hover:scale-110 transition-all duration-300">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Greeting Generator
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Create beautiful, personalized messages with style
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-300">
              {/* Greeting Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Choose occasion
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(greetingTypes).map(([key, config]) => {
                    const Icon = config.icon;
                    const isSelected = type === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setType(key as GreetingType);
                          setMessage("");
                        }}
                        className={`p-4 rounded-xl transition-all duration-300 flex items-center gap-3 transform ${getColorClasses(
                          config.color,
                          isSelected
                        )}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Message Input */}
              {type === "custom" ? (
                <div className="mb-6 animate-slide-down">
                  <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Your custom message
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Write your custom greeting message..."
                    rows={4}
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  />
                </div>
              ) : (
                <>
                  {/* Name Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Age Input for Birthday */}
                  {type === "birthday" && (
                    <div className="mb-6 animate-slide-down">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Age
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        min="1"
                        max="120"
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Generate Button */}
              <button
                onClick={generateMessage}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl animate-pulse-gentle"
              >
                Generate Message ✨
              </button>
            </div>

            {/* Personalization Panel */}
            {message && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 animate-slide-up">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Personalize Style
                </h3>

                <div className="space-y-6">
                  {/* Background Colors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Background Color
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {colorPresets.map((color) => (
                        <button
                          key={color}
                          onClick={() => setBackgroundColor(color)}
                          className={`w-10 h-10 rounded-full border-3 transition-all duration-200 transform hover:scale-110 ${
                            backgroundColor === color
                              ? "border-slate-800 scale-110"
                              : "border-white"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Text Color */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-12 rounded-xl border-2 border-slate-200 cursor-pointer"
                    />
                  </div>

                  {/* Font Style */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Font Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {fontStyles.map((font) => (
                        <button
                          key={font}
                          onClick={() => setFontStyle(font)}
                          className={`p-3 rounded-lg transition-all duration-200 ${
                            fontStyle === font
                              ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          } ${getFontClass(font)}`}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview & Actions Panel */}
          <div className="space-y-6">
            {/* Message Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden animate-slide-up">
              <div className="p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Preview
                </h2>

                <div
                  className="rounded-2xl p-8 min-h-[300px] flex items-center justify-center text-center relative overflow-hidden shadow-inner transform hover:scale-[1.02] transition-all duration-300"
                  style={{ backgroundColor }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  {message ? (
                    <div
                      className={`relative z-10 leading-relaxed max-w-md animate-fade-in ${getFontClass(
                        fontStyle
                      )}`}
                      style={{
                        color: textColor,
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {message.split("\n").map((line, index) => (
                        <div
                          key={index}
                          className="mb-2 animate-slide-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-400 text-lg animate-pulse">
                      Generate your beautiful message! ✨
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {message && (
              <div className="space-y-4 animate-slide-up">
                {/* Copy & Download */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={copyMessage}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    onClick={downloadAsImage}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>

                {/* Share Section */}
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share Your Creation
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Twitter", color: "bg-blue-500" },
                      { name: "Facebook", color: "bg-blue-600" },
                      { name: "WhatsApp", color: "bg-green-500" },
                      { name: "LinkedIn", color: "bg-blue-700" },
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        onClick={() => shareToSocial(platform.name)}
                        className={`${platform.color} hover:opacity-80 py-2 px-4 rounded-lg transition-all duration-300 font-medium transform hover:scale-105`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }

        .animate-pulse-gentle {
          animation: pulse 3s infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default GreetingGenerator;
