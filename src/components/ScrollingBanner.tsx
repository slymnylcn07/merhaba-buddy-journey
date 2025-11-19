const ScrollingBanner = () => {
  // Her "•" işaretinden sonra ve öncesine Unicode boşluk karakteri (\u00a0) eklenerek boşluk artırıldı.
  // Daha fazla boşluk için \u00a0 sayısını artırabilirsiniz.
  const text =
    "🔥 Heat Therapy \u00a0\u00a0•\u00a0\u00a0\u00a0 💡 Infrared Light \u00a0\u00a0•\u00a0\u00a0\u00a0 💆 Vibration Massage \u00a0\u00a0•\u00a0\u00a0\u00a0 🌀 360° Squeeze Support \u00a0\u00a0•\u00a0\u00a0\u00a0 🔋 Wireless and Rechargeable \u00a0\u00a0•\u00a0\u00a0\u00a0 ";

  return (
    <div className="w-full bg-secondary overflow-hidden" style={{ height: "60px" }}>
      <div className="flex items-center h-full animate-scroll-left whitespace-nowrap">
        {/* px-40 ile her span'in sol ve sağına 160px boşluk eklendi */}
        <span
          className="inline-block text-primary-foreground font-bold px-40" // px-40 (160px padding) korunmuş
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
        <span
          className="inline-block text-primary-foreground font-bold px-40"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700 }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
