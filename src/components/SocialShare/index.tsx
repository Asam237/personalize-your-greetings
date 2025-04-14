import Link from "next/link";
import { FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const SocialShare = ({
  message,
  voeuxType,
}: {
  message: string;
  voeuxType: string;
}) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedMessage = encodeURIComponent(`${voeuxType}: ${message}`);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="py-4">
      <h3 className="text-base font-medium mb-2 text-center">Share it on</h3>
      <div className="flex space-x-4 items-center justify-center">
        <Link
          href={`https://wa.me/?text=${encodedMessage}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-green-600 text-2xl hover:scale-110 transition-transform" />
        </Link>
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-blue-400 text-2xl hover:scale-110 transition-transform" />
        </Link>

        <Link
          href={`mailto:?subject=${encodeURIComponent(
            `Vœux: ${voeuxType}`
          )}&body=${encodedMessage}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="text-gray-600 text-2xl hover:scale-110 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default SocialShare;
