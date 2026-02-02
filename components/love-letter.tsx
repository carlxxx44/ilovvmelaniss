"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Heart, Sparkles } from "lucide-react"

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const openLetter = () => {
    setIsOpen(true)
    setTimeout(() => setShowContent(true), 600)
  }

  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
        <Mail className="w-5 h-5" />
        <span className="font-medium">Carta Especial</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-serif text-primary">
        Una Carta de Amor Para Ti
      </h3>

      <div className="relative max-w-md mx-auto">
        {/* Sobre cerrado */}
        <div 
          className={`
            transition-all duration-700 ease-out
            ${isOpen ? "scale-90 opacity-0 absolute inset-0" : "scale-100 opacity-100"}
          `}
        >
          <Card 
            className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 cursor-pointer hover:scale-105 transition-transform group"
            onClick={openLetter}
          >
            <div className="space-y-6">
              {/* Icono del sobre */}
              <div className="relative">
                <div className="w-24 h-20 mx-auto bg-card rounded-lg border-2 border-primary/40 relative overflow-hidden">
                  {/* Solapa del sobre */}
                  <div className="absolute inset-x-0 top-0 h-10 bg-primary/20 border-b-2 border-primary/30" 
                    style={{ 
                      clipPath: "polygon(0 0, 50% 100%, 100% 0)" 
                    }} 
                  />
                  {/* Corazon de sello */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
                    <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
                  </div>
                </div>
                <Sparkles className="absolute -top-2 -right-4 w-6 h-6 text-primary animate-pulse" />
              </div>

              <div className="space-y-2">
                <p className="text-lg font-serif text-primary">Para: Mi Amor</p>
                <p className="text-sm text-muted-foreground">De: Carlos</p>
              </div>

              <Button 
                className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 group-hover:scale-105 transition-transform"
              >
                <Mail className="w-4 h-4 mr-2" />
                Abrir Carta
              </Button>
            </div>
          </Card>
        </div>

        {/* Carta abierta */}
        <div 
          className={`
            transition-all duration-700 ease-out
            ${isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0 pointer-events-none absolute inset-0"}
          `}
        >
          <Card className="p-6 md:p-8 bg-[#fffef5] border-2 border-primary/30 shadow-xl relative overflow-hidden">
            {/* Textura de papel */}
            <div className="absolute inset-0 opacity-30" 
              style={{ 
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f472b6' fillOpacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
              }} 
            />

            <div 
              className={`
                relative z-10 transition-all duration-500
                ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              {/* Encabezado */}
              <div className="text-center mb-6 pb-4 border-b border-primary/20">
                <p className="text-sm text-muted-foreground">Febrero 2026</p>
                <p className="text-xl font-serif text-primary mt-2">Mi Melanis Hermosa,</p>
              </div>

              {/* Contenido */}
              <div className="space-y-4 text-foreground/80 leading-relaxed font-serif text-left">
                <p>
                  No se ni por donde empezar porque hay tantas cosas que quiero decirte... 
                  Desde que llegaste a mi vida todo cambio para mejor.
                </p>
                
                <p>
                  Cada dia que pasa me doy cuenta de lo afortunado que soy por tenerte. 
                  Tu sonrisa ilumina mis dias mas oscuros, tu voz es mi melodia favorita, 
                  y tu amor es el regalo mas hermoso que la vida me ha dado.
                </p>

                <p>
                  Estos 5 meses juntos han sido los mejores de mi vida. Hemos reido, 
                  hemos crecido juntos, y cada momento contigo es un tesoro que guardo 
                  en mi corazon.
                </p>

                <p>
                  Quiero que sepas que estoy aqui para ti siempre, en las buenas y en 
                  las malas. Tu eres mi persona favorita, mi mejor amiga, mi confidente, 
                  y el amor de mi vida.
                </p>

                <p>
                  Este San Valentin es especial porque es el primero de muchos que 
                  pasaremos juntos. Te prometo seguir amandote, cuidandote y haciendote 
                  feliz cada dia de nuestras vidas.
                </p>

                <p className="text-primary font-medium pt-2">
                  Te amo infinitamente,
                </p>
              </div>

              {/* Firma */}
              <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
                <p className="text-2xl font-serif text-primary italic">Carlos</p>
                <div className="flex gap-1">
                  <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
                  <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>

              {/* P.D. */}
              <div className="mt-4 p-3 bg-primary/5 rounded-xl">
                <p className="text-sm text-muted-foreground italic">
                  Cada vez que veas esta carta, recuerda que siempre estare aqui para ti.
                  Te amo mas de lo que las palabras pueden expresar.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
