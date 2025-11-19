const ScrollingBanner = () => {
  // Cümleler arasına daha fazla boşluk eklendi
  const text =
    "🔥 Heat Therapy • 💡 Infrared Light • 💆 Vibration Massage • 🌀 360° Squeeze Support • 🔋 Wireless and Rechargeable • "; // Her cümlenin sonuna 1 boşluk eklendi.
  // Eğer daha fazla boşluk istersen, buraya daha fazla boşluk karakteri ekleyebilirsin: " •    "

  return (
    <div className="w-full bg-secondary overflow-hidden" style={{ height: "60px" }}>
      <div className="flex items-center h-full animate-scroll-left whitespace-nowrap">
        {/* px-32 zaten sağ ve sol boşluk veriyor. İstersen bu değeri artırabilirsin (pl-32 pr-32 yerine pl-40 pr-40 gibi) */}
        <span
          className="inline-block text-primary-foreground font-bold px-32"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-32"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-32"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-32"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
