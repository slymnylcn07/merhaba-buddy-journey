const ScrollingBanner = () => {
  // Her "•" işaretinden sonra ve öncesine &nbsp; eklenerek boşluk artırıldı.
  // Daha fazla boşluk için &nbsp; sayısını artırabilirsiniz.
  const text =
    "🔥 Heat Therapy &nbsp;&nbsp;•&nbsp;&nbsp; 💡 Infrared Light &nbsp;&nbsp;•&nbsp;&nbsp; 💆 Vibration Massage &nbsp;&nbsp;•&nbsp;&nbsp; 🌀 360° Squeeze Support &nbsp;&nbsp;•&nbsp;&nbsp; 🔋 Wireless and Rechargeable &nbsp;&nbsp;•&nbsp;&nbsp; ";

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
