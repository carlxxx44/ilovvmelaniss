"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const platforms = [
  {
    id: "netflix",
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    bgColor: "bg-black",
    textColor: "text-red-600",
  },
  {
    id: "disney",
    name: "Disney+",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    bgColor: "bg-[#0c1a3a]",
    textColor: "text-white",
  },
  {
    id: "youtube",
    name: "YouTube",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    bgColor: "bg-white",
    textColor: "text-red-600",
  },
]

export function StreamingPicker() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">
          ¿Qué Vemos Hoy?
        </h3>
        <p className="text-foreground/70">
          Escoge una plataforma, mi amor
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            onClick={() => setSelected(platform.id)}
            className={`
              p-6 cursor-pointer transition-all duration-300 
              ${platform.bgColor} 
              border-2 hover:scale-[1.02] active:scale-95
              ${selected === platform.id 
                ? "border-primary ring-4 ring-primary/30 scale-[1.02]" 
                : "border-transparent"
              }
            `}
          >
            <div className="flex items-center justify-center h-12 relative">
              <Image
                src={platform.logo || "/placeholder.svg"}
                alt={platform.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <div className="text-center p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-primary/20 animate-in fade-in zoom-in duration-300">
          <p className="text-lg text-foreground">
            Perfecto mi amor, vamos a ver{" "}
            <span className="font-semibold text-primary">
              {platforms.find((p) => p.id === selected)?.name}
            </span>{" "}
            juntos
          </p>
        </div>
      )}
    </div>
  )
}
