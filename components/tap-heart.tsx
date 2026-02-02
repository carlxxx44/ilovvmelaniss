"use client"

import React from "react"

import { useState, useCallback } from "react"

interface Heart {
  id: number
  x: number
  y: number
}

export function TapHeart() {
  const [taps, setTaps] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [scale, setScale] = useState(1)

  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setTaps(prev => prev + 1)
    setScale(1.2)
    setTimeout(() => setScale(1), 150)

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    let clientX: number, clientY: number
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setHearts(prev => [...prev, newHeart])

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id))
    }, 1000)
  }, [])

  const getMessage = () => {
    if (taps < 10) return "¡Sigue tocando!"
    if (taps < 25) return "¡Así se siente mi corazón contigo!"
    if (taps < 50) return "¡Mi corazón late por ti!"
    if (taps < 100) return "¡Estás llenando mi corazón de amor!"
    return "¡Mi corazón es todo tuyo!"
  }

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-4">
        Llena Mi Corazón
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-4">
        Toca el corazón muchas veces
      </p>
      
      <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary/20">
        <div 
          className="relative h-64 flex items-center justify-center cursor-pointer touch-manipulation select-none"
          onClick={handleTap}
          onTouchStart={handleTap}
        >
          {/* Floating mini hearts */}
          {hearts.map(heart => (
            <span
              key={heart.id}
              className="absolute text-2xl pointer-events-none"
              style={{
                left: heart.x,
                top: heart.y,
                animation: "floatAway 1s ease-out forwards"
              }}
            >
              💗
            </span>
          ))}
          
          {/* Main heart */}
          <div 
            className="transition-transform duration-150 ease-out"
            style={{ transform: `scale(${scale})` }}
          >
            <span 
              className="text-8xl md:text-9xl"
              style={{
                filter: `drop-shadow(0 0 ${Math.min(taps, 50)}px rgba(236, 72, 153, 0.5))`
              }}
            >
              💖
            </span>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-3xl font-serif text-primary">{taps}</p>
          <p className="text-sm text-muted-foreground">{getMessage()}</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes floatAway {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}
