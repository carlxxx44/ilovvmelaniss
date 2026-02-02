import { FloatingHearts } from "@/components/floating-hearts"
import { LoveCounter } from "@/components/love-counter"
import { ValentineProposal } from "@/components/valentine-proposal"
import { LoveReasons } from "@/components/love-reasons"
import { OurHeart } from "@/components/our-heart"
import { KissCatcher } from "@/components/kiss-catcher"
import { LoveWheel } from "@/components/love-wheel"
import { ScratchCards } from "@/components/scratch-cards"
import { LoveTimeline } from "@/components/love-timeline"
import { LoveBubbles } from "@/components/love-bubbles"
import { TapHeart } from "@/components/tap-heart"
import { StreamingPicker } from "@/components/streaming-picker"
import { MoviePicker } from "@/components/movie-picker"
import { ActivityPicker } from "@/components/activity-picker"
import { LoveBot } from "@/components/love-bot"
import { LoveQuiz } from "@/components/love-quiz"
import { LoveLetter } from "@/components/love-letter"
import { LoveCoupons } from "@/components/love-coupons"
import { MemoryGame } from "@/components/memory-game"
import { ValentineCountdown } from "@/components/valentine-countdown"

export default function ValentinePage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-secondary/30 to-background z-0" />
      
      {/* Floating hearts animation */}
      <FloatingHearts />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            {/* Decorative hearts */}
            <div className="flex justify-center gap-4 text-3xl md:text-4xl mb-4">
              <span className="animate-pulse">💕</span>
              <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>💖</span>
              <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>💕</span>
            </div>
            
            {/* Main title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary leading-tight text-balance">
              Para Mi Amor
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-md mx-auto">
              Una página especial solo para ti, porque mereces todo lo bonito del mundo
            </p>
            
            {/* Scroll indicator */}
            <div className="pt-8 animate-bounce">
              <svg 
                className="w-8 h-8 mx-auto text-primary/60" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Valentine Countdown section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <ValentineCountdown />
          </div>
        </section>

        {/* Valentine Proposal section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-xl mx-auto w-full">
            <ValentineProposal />
          </div>
        </section>

        {/* Love Counter section */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <LoveCounter />
          </div>
        </section>

        {/* Our Heart section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <OurHeart />
          </div>
        </section>

        {/* Love Letter section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <LoveLetter />
          </div>
        </section>

        {/* Love Reasons section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <LoveReasons />
          </div>
        </section>

        {/* Tap Heart game section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <TapHeart />
          </div>
        </section>

        {/* Kiss Catcher game section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <KissCatcher />
          </div>
        </section>

        {/* Scratch Cards section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <ScratchCards />
          </div>
        </section>

        {/* Love Wheel section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <LoveWheel />
          </div>
        </section>

        {/* Love Bubbles section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <LoveBubbles />
          </div>
        </section>

        {/* Love Timeline section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <LoveTimeline />
          </div>
        </section>

        {/* Activity Picker section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <ActivityPicker />
          </div>
        </section>

        {/* Streaming Picker section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <StreamingPicker />
          </div>
        </section>

        {/* Movie Picker section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <MoviePicker />
          </div>
        </section>

        {/* Love Quiz section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <LoveQuiz />
          </div>
        </section>

        {/* Love Coupons section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <LoveCoupons />
          </div>
        </section>

        {/* Memory Game section */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <MemoryGame />
          </div>
        </section>

        {/* Milestone section */}
        <section className="py-16 px-4">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h3 className="text-xl md:text-2xl font-serif text-primary">
              Próximo hito especial
            </h3>
            <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-primary/20">
              <div className="text-5xl md:text-6xl mb-4">🎉</div>
              <p className="text-2xl md:text-3xl font-serif text-primary mb-2">
                6 Meses Juntos
              </p>
              <p className="text-foreground/70">
                15 de Febrero 2026
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                ¡Solo faltan unos días para celebrarlo!
              </p>
            </div>
          </div>
        </section>

        {/* Final message */}
        <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <div className="text-center space-y-8 max-w-xl mx-auto">
            <div className="text-6xl md:text-8xl">💝</div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight">
              Te Amo Infinito
            </h2>
            <p className="text-foreground/70 text-lg md:text-xl">
              Gracias por ser mi persona, mi confidente, y mi mejor amigo. Cada día a tu lado es un regalo.
            </p>
            <div className="flex justify-center gap-3 text-2xl">
              <span>💕</span>
              <span>∞</span>
              <span>💕</span>
            </div>
<p className="text-sm text-muted-foreground italic pt-4">
              Hecho con mucho amor para ti
            </p>
          </div>
        </section>
      </div>

      {/* Love Bot - floating chat */}
      <LoveBot />
    </main>
  )
}
