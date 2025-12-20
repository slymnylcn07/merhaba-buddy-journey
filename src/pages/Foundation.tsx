import { Helmet } from "react-helmet";
import { Heart, Globe, Sparkles, MessageCircle, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import foundationBg from "@/assets/foundation-bg.jpg";

const Foundation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FlexiKnee Foundation | Supporting Mobility & Joint Health</title>
        <meta name="description" content="The FlexiKnee Foundation supports joint health, mobility awareness, and pain research initiatives. A portion of every order contributes to helping people move again." />
        <link rel="canonical" href="https://flexi-knee.com/foundation" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/foundation" />
        <meta property="og:title" content="FlexiKnee Foundation | Supporting Mobility & Joint Health" />
        <meta property="og:description" content="The FlexiKnee Foundation supports joint health, mobility awareness, and pain research initiatives. A portion of every order contributes to helping people move again." />
        <meta property="og:image" content="https://flexi-knee.com/images/foundation-og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="FlexiKnee Foundation | Supporting Mobility & Joint Health" />
        <meta name="twitter:description" content="The FlexiKnee Foundation supports joint health, mobility awareness, and pain research initiatives." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/foundation-og-image.jpg" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${foundationBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/85 to-teal-700/80" />
        
        <div className="relative z-10 container px-4 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Globe className="w-8 h-8 text-teal-300" />
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Welcome to the FlexiKnee Foundation
            </h1>
          </div>
          <p className="text-lg md:text-xl text-teal-100 leading-relaxed max-w-3xl mx-auto">
            At FlexiKnee, we believe <span className="font-semibold text-white">mobility is freedom</span> —
            and everyone deserves the chance to move without pain.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-background">
        <div className="container px-4 py-12 md:py-16 max-w-4xl mx-auto">
          
          {/* Mission Statement */}
          <div className="bg-teal-50 dark:bg-teal-950/30 rounded-2xl p-6 md:p-8 mb-12 border border-teal-200/50 dark:border-teal-800/50">
            <p className="text-lg text-foreground leading-relaxed">
              That's why a portion of every order you make contributes to <strong>joint health</strong>, <strong>mobility awareness</strong>, and <strong>pain research initiatives</strong>.
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-4">
              Because your purchase shouldn't just help you —<br />
              <span className="text-teal-600 dark:text-teal-400 font-semibold">it should help someone else stand, walk, and move again.</span>
            </p>
          </div>

          {/* Why We Give Back */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-7 h-7 text-red-500 fill-red-500/30" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why We Give Back</h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Millions of people struggle daily with joint pain, stiffness, reduced mobility, and the loss of independence that follows.
              </p>
              <p>
                These issues don't only affect the elderly —<br />
                they impact <strong className="text-foreground">working adults, athletes, parents, and families worldwide</strong>.
              </p>
              <div className="bg-muted/50 rounded-xl p-6 my-6 border-l-4 border-teal-500">
                <p className="text-lg font-medium text-foreground italic">
                  Pain steals movement.<br />
                  Movement is life.
                </p>
              </div>
              <p className="font-semibold text-foreground">So we chose a mission:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">🔹</span>
                  <span>Help people restore movement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">🔹</span>
                  <span>Support education on mobility health</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">🔹</span>
                  <span>Raise awareness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">🔹</span>
                  <span>And improve access to pain-relief initiatives</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-7 h-7 text-amber-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
            </div>
            
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-2xl p-6 md:p-8 border border-teal-200/30 dark:border-teal-700/30">
              <p className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-4">
                ✔ 1% of each purchase contributes to causes related to mobility & joint health
              </p>
              <p className="text-muted-foreground mb-4">This includes support for:</p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Pain research programs</li>
                <li>• Physical rehab awareness</li>
                <li>• Mobility education resources</li>
                <li>• Recovery and prevention projects</li>
              </ul>
              <p className="mt-6 text-foreground italic">
                It's a small percentage —<br />
                <strong>but multiplied by people like you, it becomes meaningful.</strong>
              </p>
            </div>
          </section>

          {/* Does My Order Make a Difference */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-7 h-7 text-blue-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">"Does my order really make a difference?"</h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                <strong className="text-foreground">Yes</strong> — your order contributes to our growing mobility initiative.
              </p>
              <p>Each purchase:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">✔</span>
                  <span>funds awareness</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">✔</span>
                  <span>spreads hope</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">✔</span>
                  <span>and helps someone move more comfortably</span>
                </li>
              </ul>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 mt-6 border border-amber-200/50 dark:border-amber-800/50">
                <p className="text-foreground leading-relaxed">
                  Maybe it's one person walking stairs again…<br />
                  or bending down to tie their shoes…<br />
                  or hugging their kids without wincing.
                </p>
                <p className="mt-4 font-semibold text-amber-700 dark:text-amber-400">
                  Movement is dignity.<br />
                  You help restore that dignity.
                </p>
              </div>
            </div>
          </section>

          {/* Thank You */}
          <section className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-7 h-7 text-teal-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Thank You for Being Part of This</h2>
            </div>
            
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-10 text-white">
              <p className="text-lg leading-relaxed mb-4">
                FlexiKnee isn't just a product —<br />
                <span className="font-semibold">it's a step toward better mobility for many.</span>
              </p>
              <p className="text-2xl font-bold mb-6">Together, we move.</p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-amber-300">💛</span>
                <span className="text-sm">Stay tuned — we'll continue sharing initiative updates right here.</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Foundation;
