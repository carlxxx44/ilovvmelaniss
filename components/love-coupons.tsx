"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, Check, Gift, Sparkles } from "lucide-react"

interface Coupon {
  id: string
  title: string
  description: string
  emoji: string
  used: boolean
}

const initialCoupons: Coupon[] = [
  { id: "1", title: "Noche de Pelis", description: "Una noche viendo peliculas juntos con palomitas", emoji: "🎬", used: false },
  { id: "4", title: "Dia de Princesa", description: "Un dia completo consintiendote", emoji: "👑", used: false },
  { id: "6", title: "Carta de Amor", description: "Carlos te escribe una carta personalizada", emoji: "💌", used: false },
  { id: "7", title: "Videollamada Extra", description: "Videollamada larga sin importar la hora", emoji: "📱", used: false },
  { id: "8", title: "Deseo Cumplido", description: "Carlos cumple un deseo que tu elijas", emoji: "⭐", used: false },
]

export function LoveCoupons() {
  const [coupons, setCoupons] = useState(initialCoupons)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const useCoupon = (couponId: string) => {
    setCoupons(coupons.map(c => 
      c.id === couponId ? { ...c, used: true } : c
    ))
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setSelectedCoupon(null)
    }, 2000)
  }

  const handleUseCoupon = () => {
    if (selectedCoupon) {
      useCoupon(selectedCoupon.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Ticket className="w-5 h-5" />
          <span className="font-medium">Cupones Canjeables</span>
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-primary">
          Cupones del Amor
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Toca un cupon para canjearlo cuando quieras
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {coupons.map((coupon) => (
          <button
            key={coupon.id}
            onClick={() => !coupon.used && setSelectedCoupon(coupon)}
            disabled={coupon.used}
            className={`
              relative p-4 rounded-2xl text-left transition-all duration-300
              ${coupon.used 
                ? "bg-muted/50 opacity-60 cursor-not-allowed" 
                : "bg-gradient-to-br from-card to-secondary/50 border-2 border-primary/20 hover:border-primary hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              }
            `}
          >
            {coupon.used && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-2xl">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <Check className="w-6 h-6" />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <span className="text-3xl">{coupon.emoji}</span>
              <p className="font-semibold text-foreground text-sm leading-tight">
                {coupon.title}
              </p>
            </div>
            {!coupon.used && (
              <div className="absolute top-2 right-2">
                <Gift className="w-4 h-4 text-primary" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Modal de confirmacion */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <Card className="max-w-sm w-full p-6 space-y-4 animate-in zoom-in-95 relative overflow-hidden">
            {/* Confetti */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`,
                      animationDelay: `${Math.random() * 0.3}s`
                    }}
                  >
                    {["💖", "✨", "💕", "🎉"][Math.floor(Math.random() * 4)]}
                  </div>
                ))}
              </div>
            )}

            {!showConfetti ? (
              <>
                <div className="text-center">
                  <span className="text-5xl block mb-3">{selectedCoupon.emoji}</span>
                  <h4 className="text-xl font-serif text-primary">{selectedCoupon.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{selectedCoupon.description}</p>
                </div>

                <div className="bg-primary/5 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    Al canjear este cupon, Carlos se compromete a cumplirlo
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCoupon(null)}
                    className="flex-1 rounded-full"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleUseCoupon}
                    className="flex-1 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Canjear
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">🎉</div>
                <h4 className="text-xl font-serif text-primary">Cupon Canjeado!</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Carlos cumplira este cupon pronto!
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
