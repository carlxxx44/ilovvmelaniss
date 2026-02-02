"use client"

const reasons = [
  { emoji: "✨", text: "Tu sonrisa ilumina mis días" },
  { emoji: "💫", text: "Me haces reír cuando más lo necesito" },
  { emoji: "🌸", text: "Eres mi persona favorita" },
  { emoji: "💝", text: "Contigo todo es más bonito" },
  { emoji: "🦋", text: "Me das mariposas en el estómago" },
  { emoji: "🌙", text: "Eres lo primero y último que pienso cada día" },
]

export function LoveReasons() {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-6">
        Razones por las que te amo
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-md border border-primary/10 hover:border-primary/30 transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{reason.emoji}</span>
              <p className="text-foreground/80 text-sm md:text-base">{reason.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
