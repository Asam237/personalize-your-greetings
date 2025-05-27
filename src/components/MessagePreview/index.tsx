const MessagePreview = ({
  message,
  backgroundColor,
  textColor,
  fontFamily,
  type,
}: any) => {
  const backgroundImages: { [key: string]: string } = {
    anniversaire: "/images/birthday-bg.jpg",
    mariage: "/images/wedding-bg.jpg",
    nouvel_an: "/images/newyear-bg.jpg",
    deces: "/images/death-bg.jpg",
    default: "",
  };

  const backgroundImage = backgroundImages[type] || backgroundImages.default;

  return (
    <div
      className="p-4 rounded-lg min-h-48 flex items-center justify-center shadow-lg transition-transform transform hover:scale-105 z-10 relative overflow-hidden"
      style={{
        color: textColor || "#333",
        fontFamily: fontFamily?.split(",")[0] || "sans-serif",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7,
        }}
      />

      {/* Couche de couleur */}
      {backgroundColor && (
        <div
          className="absolute inset-0 z-0"
          style={{
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Contenu */}
      <div className="relative z-10 w-full">
        {message ? (
          <p
            className="text-center text-lg font-semibold leading-relaxed p-4 bg-white bg-opacity-70"
            style={{
              color: textColor || "#333",
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            {message}
          </p>
        ) : (
          <p className="text-center text-gray-500 italic">
            Votre message apparaîtra ici
          </p>
        )}
      </div>
    </div>
  );
};

export default MessagePreview;
