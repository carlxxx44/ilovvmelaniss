"use client"

import Image from "next/image"

interface OurHeartProps {
  imageSrc?: string
}

export function OurHeart({ imageSrc }: OurHeartProps) {
  return (
    <div className="relative flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-6">
        Nuestro Amor
      </h3>
      
      <div className="relative">
        {/* Heart shape container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 animate-pulse">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-lg">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-primary/30"
                filter="url(#glow)"
              />
            </svg>
          </div>
          
          {/* Main heart with image or placeholder */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "path('M12 21.35 C12 21.35 10.55 20.03 10.55 20.03 C5.4 15.36 2 12.28 2 8.5 C2 5.42 4.42 3 7.5 3 C9.24 3 10.91 3.81 12 5.09 C13.09 3.81 14.76 3 16.5 3 C19.58 3 22 5.42 22 8.5 C22 12.28 18.6 15.36 13.45 20.03 L12 21.35 Z')",
              transform: "scale(10.5)",
              transformOrigin: "1.14% 0.5%",
            }}
          >
            {imageSrc ? (
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt="Nuestro amor"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/50 flex items-center justify-center">
                <span className="text-6xl md:text-8xl">💕</span>
              </div>
            )}
          </div>
          
          {/* Decorative sparkles */}
          <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{ animationDelay: "0.5s" }}>✨</div>
          <div className="absolute top-1/4 -left-4 text-xl animate-pulse" style={{ animationDelay: "1s" }}>💫</div>
          <div className="absolute top-1/4 -right-4 text-xl animate-pulse" style={{ animationDelay: "1.5s" }}>💫</div>
        </div>
      </div>
      
      <p className="text-center text-muted-foreground mt-6 text-sm md:text-base italic">
        Juntos desde el 15 de agosto de 2025 💕
      </p>
    </div>
  )
}
