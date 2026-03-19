import { useState, useEffect } from "react";
import { Check, Copy, Facebook, Twitter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ShareButtonsProps {
  url: string;
  title: string;
}

const shareButtons = (url: string, title: string) => [
  {
    name: "X",
    icon: <Twitter className="w-4 h-4" />,
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-4 h-4" />,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Pinterest",
    icon: <PinterestIcon />,
    href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: <WhatsAppIcon />,
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
  },
];

const BUTTON_CLASS =
  "w-10 h-10 flex items-center justify-center bg-white border border-[#eeeeee] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-muted-foreground transition-all duration-200 ease-in-out hover:scale-105 hover:text-primary";

const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        title="Copy link"
        className={BUTTON_CLASS}
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
      {copied && (
        <div className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white border border-[#eeeeee] rounded-lg px-3 py-1.5 text-xs font-medium text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-fade-in">
          Link copied!
        </div>
      )}
    </div>
  );
};

export const ArticleShareSidebar = ({ url, title }: ShareButtonsProps) => {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobile) return null;

  return (
    <div className={`hidden lg:flex fixed right-[calc((50%-24rem)/2-1.25rem)] top-1/2 -translate-y-1/2 flex-col gap-3 z-40 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {shareButtons(url, title).map((btn) => (
        <a
          key={btn.name}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${btn.name}`}
          className={BUTTON_CLASS}
        >
          {btn.icon}
        </a>
      ))}
      <CopyButton url={url} />
    </div>
  );
};

export const ArticleShareBlock = ({ url, title }: ShareButtonsProps) => {
  return (
    <div className="mt-10 mb-0 py-8 border-t border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Share this guide</h3>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {shareButtons(url, title).map((btn) => (
          <a
            key={btn.name}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${btn.name}`}
            className="w-12 h-12 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-muted/60 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
          >
            {btn.icon}
          </a>
        ))}
        <CopyButton url={url} />
      </div>
    </div>
  );
};
