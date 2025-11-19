const ScrollingBanner = () => {
  const text = "🔥 Heat Therapy • 💡 Infrared Light • 💆 Vibration Massage • 🌀 360° Squeeze Support • 🔋 Wireless and Rechargeable •";
  
  return (
    <div className="w-full bg-secondary overflow-hidden" style={{ height: '60px' }}>
      <div className="flex items-center h-full animate-scroll-left whitespace-nowrap">
        <span className="inline-block text-primary-foreground font-bold px-32" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 700 }}>
          {text}
        </span>
        <span className="inline-block text-primary-foreground font-bold px-32" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 700 }}>
          {text}
        </span>
        <span className="inline-block text-primary-foreground font-bold px-32" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 700 }}>
          {text}
        </span>
        <span className="inline-block text-primary-foreground font-bold px-32" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 700 }}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
