const ScrollingBanner = () => {
  // Boşlukları daha az ekleyerek word-spacing ile kontrol edeceğiz
  const text =
    "🔥 Heat Therapy • 💡 Infrared Light • 💆 Vibration Massage • 🌀 360° Squeeze Support • 🔋 Wireless and Rechargeable • ";

  return (
    <div className="w-full bg-secondary overflow-hidden" style={{ height: "60px" }}>
      <div className="flex items-center h-full animate-scroll-left whitespace-nowrap">
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          // word-spacing özelliği ekleyerek kelimeler arası boşluğu artırıyoruz
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700, wordSpacing: "0.5em" }} // '0.5em' istediğiniz değere göre artırabilir/azaltabilirsiniz
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700, wordSpacing: "0.5em" }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700, wordSpacing: "0.5em" }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700, wordSpacing: "0.5em" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
