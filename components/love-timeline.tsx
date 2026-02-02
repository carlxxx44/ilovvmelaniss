"use client"

const milestones = [
  {
    date: "15 de Agosto 2025",
    title: "El día que empezó todo",
    description: "El día más especial, cuando decidimos caminar juntos",
    emoji: "💕"
  },
  {
    date: "15 de Septiembre 2025",
    title: "1 Mes juntos",
    description: "Nuestro primer mes, el comienzo de algo hermoso",
    emoji: "🌟"
  },
  {
    date: "15 de Octubre 2025",
    title: "2 Meses juntos",
    description: "Cada día más enamorados",
    emoji: "🦋"
  },
  {
    date: "15 de Noviembre 2025",
    title: "3 Meses juntos",
    description: "Construyendo recuerdos inolvidables",
    emoji: "🍂"
  },
  {
    date: "15 de Diciembre 2025",
    title: "4 Meses juntos",
    description: "Nuestra primera navidad juntos cerca",
    emoji: "🎄"
  },
  {
    date: "15 de Enero 2026",
    title: "5 Meses juntos",
    description: "Empezando el año más enamorados que nunca",
    emoji: "✨"
  },
  {
    date: "15 de Febrero 2026",
    title: "6 Meses juntos",
    description: "¡Medio año de amor! Y lo que falta...",
    emoji: "💝"
  },
]

export function LoveTimeline() {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-4">
        Nuestra Historia
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Cada mes es un capítulo de nuestra historia de amor
      </p>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30" />
        
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative pl-16">
              {/* Circle marker */}
              <div className="absolute left-4 top-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg transform -translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>
              
              {/* Content card */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary/20 transition-all duration-300 hover:shadow-xl hover:border-primary/40">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{milestone.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">{milestone.date}</p>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{milestone.title}</h4>
                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
