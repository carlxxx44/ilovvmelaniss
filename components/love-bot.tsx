"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircleHeart, Send, X, Sparkles, Heart, Volume2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

// Base de conocimiento completa sobre Carlos y Melanis
const knowledge = {
  melanis: {
    nombre: "Melanis",
    rol: "la novia mas hermosa del mundo",
    caracteristicas: ["hermosa", "especial", "unica", "perfecta", "increible", "maravillosa"],
    significado: "todo para Carlos, su razon de vivir, su sol, su luna, sus estrellas"
  },
  carlos: {
    nombre: "Carlos",
    rol: "el novio mas afortunado del mundo",
    caracteristicas: ["amoroso", "dedicado", "romantico", "detallista"],
    hizo: "creo esta pagina web con todo su amor"
  },
  relacion: {
    inicio: "15 de agosto de 2025",
    meses: 5,
    dias: 18,
    proximoHito: "6 meses el 15 de febrero de 2026",
    primerSanValentin: true
  }
}

// Diccionario expandido de respuestas
const responsePatterns: { patterns: string[], responses: string[] }[] = [
  // Identidad de Melanis
  {
    patterns: ["quien soy", "mi nombre", "como me llamo", "que soy", "soy yo"],
    responses: [
      `Tu eres ${knowledge.melanis.nombre}, la novia mas hermosa, especial y perfecta del universo entero. Eres el amor de la vida de Carlos, su todo, su razon de sonreir cada manana y su ultimo pensamiento antes de dormir.`,
      `Eres Melanis, la chica que le robo el corazon a Carlos para siempre. Eres su princesa, su reina, su mundo entero. El te ama mas de lo que las palabras pueden expresar.`,
      `Tu eres Melanis, la persona mas importante en la vida de Carlos. Eres su novia, su mejor amiga, su confidente, su todo. El agradece cada dia por tenerte.`
    ]
  },
  // Sobre Carlos
  {
    patterns: ["quien es carlos", "carlos", "mi novio", "el novio"],
    responses: [
      `Carlos es ese muchacho tan hermoso, romantico y detallista que creo esta pagina web increible solo para ti. Es tu novio que te ama con locura, que piensa en ti todo el tiempo, y que haria cualquier cosa por verte feliz.`,
      `Carlos es el amor de tu vida, el chico que se desvive por ti, que te adora con todo su ser. El creo toda esta pagina desde cero solo para demostrarte cuanto te ama.`,
      `Tu novio Carlos es el hombre mas afortunado del mundo por tenerte. El te ama infinitamente y quiso sorprenderte con esta pagina llena de amor.`
    ]
  },
  // Tiempo juntos
  {
    patterns: ["cuanto llevamos", "cuanto tiempo", "meses", "tiempo juntos", "desde cuando"],
    responses: [
      `Ustedes llevan juntos desde el ${knowledge.relacion.inicio}. Ya son ${knowledge.relacion.meses} meses y ${knowledge.relacion.dias} dias de puro amor! El 15 de febrero cumpliran 6 meses. Cada segundo juntos es un tesoro.`,
      `Desde el 15 de agosto de 2025, sus vidas se unieron para siempre. Ya van ${knowledge.relacion.meses} meses y contando! Su amor crece mas fuerte cada dia que pasa.`,
      `5 meses, 18 dias, miles de horas, millones de latidos... todo ese tiempo Carlos ha estado enamorado de ti. Y el 15 de febrero celebraran medio anito juntos!`
    ]
  },
  // Cumplidos y cosas lindas
  {
    patterns: ["algo lindo", "algo bonito", "dime algo", "hazme feliz", "cumplido", "piropea"],
    responses: [
      "Eres como el amanecer despues de la noche mas oscura. Tu sonrisa ilumina el mundo de Carlos de maneras que ni el sol puede.",
      "Si Carlos pudiera elegir entre todas las personas del universo, te elegiria a ti mil millones de veces. Eres su todo.",
      "Tus ojos son galaxias donde Carlos se pierde felizmente. Eres la persona mas hermosa que el ha conocido.",
      "Carlos dice que cuando te conocio, supo que su vida nunca seria igual. Tu eres su antes y su despues.",
      "Eres el tipo de persona que hace que Carlos quiera ser mejor cada dia. Tu lo inspiras con solo existir.",
      "Si el amor fuera agua, Carlos estaria ahogandose en un oceano infinito gracias a ti.",
      "Tu no solo eres hermosa por fuera, tu alma brilla con una luz que Carlos nunca habia visto en nadie mas.",
      "Cada vez que Carlos piensa en ti, su corazon late mas rapido. Eres su arritmia favorita."
    ]
  },
  // Te amo / amor
  {
    patterns: ["te amo", "te quiero", "love you", "i love", "amor"],
    responses: [
      "Carlos te ama MUCHISIMO mas! Te ama hasta el infinito y mas alla. Tu eres su vida entera, su universo completo.",
      "Awww! Carlos siente su corazon explotar de amor cada vez que piensas en el. Te ama con cada fibra de su ser.",
      "El amor que Carlos siente por ti no tiene limites. Te ama hoy, te amara manana, te amara por siempre.",
      "Tu amor es el regalo mas hermoso que Carlos ha recibido. El te ama infinitamente!"
    ]
  },
  // San Valentin
  {
    patterns: ["san valentin", "valentin", "14 de febrero", "dia del amor", "febrero 14"],
    responses: [
      "Este es su PRIMER San Valentin juntos y Carlos quiere que sea inolvidable! Por eso creo toda esta pagina. El quiere ser tu San Valentin para siempre!",
      "San Valentin es super especial este ano porque es el primero que pasan como novios. Carlos esta muy emocionado de celebrarlo contigo!",
      "El 14 de febrero sera magico porque lo pasaran juntos. Carlos tiene mucho amor guardado para darte ese dia!"
    ]
  },
  // Saludos
  {
    patterns: ["hola", "hey", "buenas", "hi", "hello", "saludos", "que tal"],
    responses: [
      "Hola mi amor! Soy tu Bot del Amor y estoy aqui para recordarte lo increiblemente especial que eres para Carlos!",
      "Hey hermosa! Que alegria que me escribas. Carlos te manda millones de besitos a traves de mi!",
      "Holaaa! Bienvenida a tu chat especial. Preguntame lo que quieras, estoy aqui para ti!"
    ]
  },
  // Como estas
  {
    patterns: ["como estas", "que tal estas", "todo bien", "como te va"],
    responses: [
      "Yo estoy genial, pero mas feliz esta Carlos de tenerte en su vida! Y tu como estas mi amor?",
      "Mientras tu estes bien, todo esta perfecto! Carlos siempre se preocupa por tu bienestar.",
      "Estoy aqui lleno de amor para darte! Carlos me programo con muchisimo carino para ti."
    ]
  },
  // Gracias
  {
    patterns: ["gracias", "thank", "agradec"],
    responses: [
      "De nada mi amor! Carlos es quien deberia agradecer por tener a alguien tan especial como tu.",
      "No hay de que! Recuerda que Carlos siempre estara ahi para ti, en las buenas y en las malas.",
      "Siempre es un placer! Carlos te ama muchisimo y quiere que siempre te sientas querida."
    ]
  },
  // Besos
  {
    patterns: ["beso", "besito", "kiss", "mua"],
    responses: [
      "Aqui tienes un millon de besitos de Carlos! Muah muah muah muah! En la frente, en las mejillas, en la nariz, y uno especial en los labios!",
      "Carlos te manda una lluvia de besos! Que lleguen toditos a ti! Muuuuah!",
      "Besitos infinitos para ti! Carlos quisiera estar ahi para dartelos en persona. Muah!"
    ]
  },
  // Abrazos
  {
    patterns: ["abrazo", "abrazito", "hug", "abrazar"],
    responses: [
      "Un abrazo virtual gigaaaante de parte de Carlos! De esos que no quieres soltar nunca. El te abraza con todo su amor!",
      "Carlos te manda el abrazo mas calentito y apretado del mundo! Imagina que estas en sus brazos ahora mismo.",
      "Abrazoooote! Carlos suena con el dia que pueda abrazarte sin parar. Mientras tanto, recibe este abrazo virtual lleno de amor!"
    ]
  },
  // Extranar
  {
    patterns: ["extrano", "extrana", "miss", "falta", "lejos"],
    responses: [
      "Carlos te extrana MUCHISIMO! Cada segundo sin ti se siente eterno. Pero pronto estaran juntos y sera magico!",
      "Tu le haces mucha falta a Carlos! El cuenta los minutos para volver a verte. Te extrana con todo su corazon.",
      "La distancia es dificil, pero el amor de ustedes es mas fuerte! Carlos te extrana un monton pero sabe que pronto se veran."
    ]
  },
  // Triste / mal
  {
    patterns: ["triste", "sad", "mal", "llor", "deprim", "angust"],
    responses: [
      "No estes triste mi amor! Carlos te manda todo su carino y miles de abracitos virtuales. Tu eres su sol y el quiere verte brillar!",
      "Hey, si algo te preocupa, recuerda que Carlos siempre esta ahi para ti. El te ama y quiere verte feliz!",
      "Animo mi vida! Carlos dice que tu sonrisa es la cosa mas hermosa del mundo y quiere verla siempre. El te apoya en todo!"
    ]
  },
  // Feliz / bien
  {
    patterns: ["feliz", "happy", "content", "alegr", "bien", "genial"],
    responses: [
      "Me alegra muchisimo que estes feliz! Tu felicidad es la felicidad de Carlos. El haria cualquier cosa por mantenerte asi!",
      "Yay! Carlos se pone super feliz cuando tu estas bien. Tu alegria es contagiosa!",
      "Que lindo saber que estas bien! Carlos siempre quiere lo mejor para ti. Tu mereces toda la felicidad del mundo!"
    ]
  },
  // Pagina web
  {
    patterns: ["pagina", "web", "sitio", "esto", "creaste", "hiciste"],
    responses: [
      "Carlos creo esta pagina web con TODO su amor y dedicacion! Cada corazon, cada animacion, cada palabra fue pensada especialmente para ti. Le tomo tiempo pero lo hizo con mucho carino.",
      "Esta pagina es un regalo de Carlos para ti. El quiso crear algo unico y especial para demostrarte cuanto te ama. Cada detalle tiene su amor.",
      "Todo lo que ves aqui fue hecho por Carlos pensando en ti! Queria darte algo diferente y memorable para San Valentin."
    ]
  },
  // Por que
  {
    patterns: ["por que", "porque", "razon", "motivo"],
    responses: [
      "Porque Carlos te ama! Esa es la respuesta a todo. Te ama tanto que mueve montanas por ti.",
      "La razon es simple: AMOR. Carlos te ama con locura y quiere demostrartelo de mil maneras.",
      "Porque tu lo mereces todo! Carlos cree que eres la persona mas especial y quiere hacerte feliz."
    ]
  },
  // Bonita / hermosa
  {
    patterns: ["bonita", "hermosa", "linda", "bella", "guapa", "preciosa"],
    responses: [
      "Tu eres la persona MAS hermosa que existe! Carlos lo dice siempre y es la pura verdad.",
      "Hermosa es poco para describirte! Carlos dice que tu belleza no tiene comparacion.",
      "Linda por fuera y por dentro! Carlos admira todo de ti, eres perfecta para el."
    ]
  },
  // Futuro juntos
  {
    patterns: ["futuro", "siempre", "para siempre", "juntos", "planes"],
    responses: [
      "Carlos quiere un futuro contigo! Suena con todos los momentos que viviran juntos. Tu eres su para siempre.",
      "El futuro de Carlos te incluye a ti en cada plan. El quiere construir una vida hermosa a tu lado.",
      "Juntos para siempre! Carlos no imagina su vida sin ti. Tu eres su presente y su futuro."
    ]
  },
  // Perdon / disculpa
  {
    patterns: ["perdon", "disculpa", "lo siento", "sorry", "perdoname"],
    responses: [
      "Aww no te preocupes mi amor! Carlos siempre te perdonaria porque te ama. Los problemas se resuelven juntos.",
      "El amor es mas fuerte que cualquier problema! Carlos te quiere y siempre buscara resolver las cosas contigo.",
      "Esta bien mi vida! Lo importante es que se aman. Carlos valora que siempre quieran mejorar juntos."
    ]
  },
  // Dormir / noche
  {
    patterns: ["dormir", "sueno", "noche", "buenas noches", "descansar"],
    responses: [
      "Buenas noches mi amor! Carlos te desea los suenos mas dulces. El sera tu ultimo pensamiento antes de dormir. Que descanses!",
      "Dulces suenos princesa! Carlos te manda un besito de buenas noches y te abraza en pensamientos.",
      "A dormir mi vida! Carlos espera que suenes cosas bonitas. El estara pensando en ti. Te ama!"
    ]
  },
  // Buenos dias / manana
  {
    patterns: ["buenos dias", "buen dia", "manana", "desperte", "levante"],
    responses: [
      "Buenos dias hermosa! Carlos espera que hayas descansado bien. Tu eres su primer pensamiento cada manana!",
      "Buen dia mi amor! Que hoy sea un dia increible para ti. Carlos te manda energia positiva y mucho amor!",
      "Feliz dia princesa! Carlos ya esta pensando en ti desde temprano. Que tengas un dia hermoso!"
    ]
  },
  // Comida / hambre
  {
    patterns: ["hambre", "comida", "comer", "comiste", "desayun", "almuerz", "cen"],
    responses: [
      "Recuerda comer bien mi amor! Carlos se preocupa por ti y quiere que estes saludable y fuerte.",
      "La comida es importante! Carlos te recuerda que te cuides y comas rico. El quiere que estes bien!",
      "Yummy! Espero que comas algo delicioso. Carlos dice que cocinar juntos seria muy romantico!"
    ]
  },
  // Celos / otra persona
  {
    patterns: ["celos", "otra", "otro", "celosa", "celoso", "infiel"],
    responses: [
      "Carlos solo tiene ojos para ti! Tu eres la unica en su corazon. No hay nadie mas, solo tu.",
      "No hay razon para celos mi amor! Carlos te ama solamente a ti. Tu eres su todo, su unica.",
      "El corazon de Carlos te pertenece completamente! Tu eres irreemplazable para el."
    ]
  },
  // Pelea / enojada
  {
    patterns: ["pelea", "pelear", "enojad", "molest", "brav"],
    responses: [
      "Las peleas pasan en todas las parejas, pero su amor es mas fuerte! Carlos siempre querra resolver las cosas contigo.",
      "Hey, respira profundo mi amor. Carlos te ama aunque a veces haya problemas. Juntos pueden superar todo!",
      "El amor verdadero supera los obstaculos! Carlos y tu pueden hablar y arreglar cualquier cosa."
    ]
  },
  // Videollamada
  {
    patterns: ["videollamada", "llamada", "video", "facetime", "zoom", "llamar"],
    responses: [
      "Las videollamadas con Carlos deben ser lo mejor! Ver su carita y escuchar su voz... que lindo!",
      "Carlos ama hacer videollamadas contigo! Es la manera de sentirse mas cerca cuando no estan juntos.",
      "Conectarse por video es especial! Carlos disfruta cada segundo viendote, aunque sea por pantalla."
    ]
  },
  // Musica / canciones
  {
    patterns: ["musica", "cancion", "canciones", "escuchar", "spotify"],
    responses: [
      "La musica y el amor van de la mano! Carlos tiene canciones que le recuerdan a ti. Ustedes deberian tener una cancion especial!",
      "Cada cancion de amor le recuerda a ti! Carlos piensa en ustedes cuando escucha musica romantica.",
      "Escuchar musica juntos es hermoso! Carlos disfrutaria mucho compartir canciones contigo."
    ]
  },
  // Regalos
  {
    patterns: ["regalo", "sorpresa", "detalle", "dar"],
    responses: [
      "Esta pagina web es uno de los regalos de Carlos para ti! Pero el siempre querra darte mas sorpresas.",
      "Carlos ama darte sorpresas! El disfruta ver tu carita de felicidad cuando te da algo especial.",
      "Los mejores regalos vienen del corazon, como esta pagina! Carlos pone amor en todo lo que te da."
    ]
  },
  // Fotos
  {
    patterns: ["foto", "fotos", "selfie", "imagen", "picture"],
    responses: [
      "Las fotos juntos son tesoros! Carlos guarda cada foto de ustedes con mucho carino.",
      "Carlos ama las fotos contigo! Cada imagen captura momentos especiales de su amor.",
      "Las fotos son recuerdos eternos! Carlos quiere llenar galerias enteras de momentos con ti."
    ]
  },
  // Especial / unica
  {
    patterns: ["especial", "unic", "diferente", "distint"],
    responses: [
      "Tu eres UNICA en el universo! No hay nadie como tu y Carlos lo sabe. Por eso te ama tanto.",
      "Lo que hace especial su relacion es el amor genuino! Carlos nunca habia sentido algo asi por nadie.",
      "Tu eres diferente a todas, y eso es lo que Carlos mas ama de ti. Eres su persona especial."
    ]
  },
  // Familia
  {
    patterns: ["familia", "papa", "mama", "padres", "hermano", "hermana"],
    responses: [
      "La familia es importante! Carlos respeta mucho a tu familia porque son parte de ti.",
      "Carlos espera poder conocer bien a tu familia algun dia. El quiere que todos sepan cuanto te ama!",
      "Tu familia debe ser genial porque criaron a alguien tan increible como tu!"
    ]
  },
  // Trabajo / estudio
  {
    patterns: ["trabajo", "trabajar", "estudio", "estudiar", "escuela", "universidad", "tarea"],
    responses: [
      "Echale ganas mi amor! Carlos cree en ti y sabe que puedes lograr todo lo que te propongas.",
      "Tu eres super inteligente y capaz! Carlos te apoya en todo lo que hagas.",
      "El esfuerzo vale la pena! Carlos admira lo dedicada que eres. Tu puedes con todo!"
    ]
  },
  // Suenos / metas
  {
    patterns: ["sueno", "meta", "quiero ser", "quiero hacer", "objetivo"],
    responses: [
      "Carlos apoya todos tus suenos! El quiere verte lograr cada meta que te propongas.",
      "Tus suenos son importantes! Carlos estara ahi animandote en cada paso del camino.",
      "Juntos pueden lograr cualquier cosa! Carlos cree en ti y en sus suenos como pareja."
    ]
  },
  // Promesas
  {
    patterns: ["promesa", "prometo", "juro", "palabra"],
    responses: [
      "Carlos promete amarte siempre! Esa es su promesa mas importante y la cumplira toda la vida.",
      "Las promesas de amor son sagradas! Carlos cumple lo que te dice porque te ama de verdad.",
      "Carlos te da su palabra de que siempre estara ahi para ti. Tu eres su prioridad."
    ]
  },
  // Cita / salir
  {
    patterns: ["cita", "salir", "pasear", "lugar", "ir a"],
    responses: [
      "Las citas con Carlos deben ser lo mejor! El siempre quiere crear momentos especiales contigo.",
      "Carlos ama pasar tiempo contigo, ya sea en una cita fancy o simplemente estando juntos.",
      "Cada momento juntos es una aventura! Carlos disfruta cada salida contigo."
    ]
  },
  // Confiar / confianza
  {
    patterns: ["confi", "confiar", "confio", "lealtad", "leal"],
    responses: [
      "La confianza es la base de su amor! Carlos es leal a ti y solo a ti. Puedes confiar en el siempre.",
      "Carlos nunca traicionaria tu confianza! El te respeta y te valora demasiado.",
      "Ustedes tienen algo hermoso basado en confianza y amor! Carlos cuida eso con su vida."
    ]
  },
  // Chiste / gracioso
  {
    patterns: ["chiste", "gracioso", "risa", "reir", "chistoso", "broma"],
    responses: [
      "Jaja! Carlos ama cuando te ries. Tu risa es la melodia mas hermosa para sus oidos.",
      "El humor es importante! Carlos disfruta mucho los momentos divertidos contigo.",
      "Reirse juntos es lo mejor! Carlos quiere hacerte sonreir y reir siempre."
    ]
  },
  // Apoyo / ayuda
  {
    patterns: ["apoyo", "apoyar", "ayuda", "ayudar", "necesito", "problema"],
    responses: [
      "Carlos SIEMPRE estara ahi para apoyarte! En las buenas y en las malas, el no te suelta.",
      "Puedes contar con Carlos para todo! El quiere ser tu roca, tu apoyo incondicional.",
      "Nunca estaras sola! Carlos te ayudara con lo que necesites porque te ama."
    ]
  },
  // Recuerdos / momentos
  {
    patterns: ["recuerdo", "momento", "memoria", "acuerdo", "vez que"],
    responses: [
      "Cada momento con Carlos es un recuerdo precioso! El guarda todos en su corazon.",
      "Los recuerdos juntos son tesoros! Carlos ama pensar en todos los momentos que han vivido.",
      "Van a crear muchos mas recuerdos hermosos! Carlos quiere una vida llena de momentos contigo."
    ]
  },
  // Romantico
  {
    patterns: ["romantic", "cursi", "tierno", "lindo detalle"],
    responses: [
      "Carlos es super romantico! Todo lo que hace por ti sale de su corazon enamorado.",
      "El romanticismo de Carlos es genuino! El ama consentirte y hacerte sentir especial.",
      "Ser romantico contigo es facil para Carlos porque te ama! Tu lo inspiras a ser asi."
    ]
  },
  // Mejor novio
  {
    patterns: ["mejor novio", "el mejor", "afortunada", "suerte"],
    responses: [
      "Carlos dice que EL es el afortunado por tenerte a ti! Tu eres el premio mayor de su vida.",
      "Ustedes dos se merecen! Son la pareja perfecta porque se aman de verdad.",
      "La suerte es de los dos! Carlos y tu se encontraron y eso es magico."
    ]
  }
]

// Funcion mejorada para generar respuestas
function generateResponse(input: string): string {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
  
  // Buscar coincidencia en los patrones
  for (const pattern of responsePatterns) {
    for (const p of pattern.patterns) {
      if (normalized.includes(p)) {
        const responses = pattern.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
  }
  
  // Respuestas por defecto variadas
  const defaultResponses = [
    "Carlos te ama muchisimo! Nunca lo olvides. Eres lo mas importante en su vida.",
    "Eres la persona mas especial en la vida de Carlos. El te adora!",
    "Cada dia Carlos agradece tenerte. Tu eres su bendicion.",
    "El amor que Carlos siente por ti es infinito e incondicional.",
    "Tu eres el regalo mas hermoso que la vida le dio a Carlos.",
    "Carlos piensa en ti todo el tiempo. Tu ocupas su mente y su corazon.",
    "No existe nadie en el mundo que Carlos ame mas que a ti.",
    "Eres su razon de ser feliz. Carlos te ama con todo su corazon.",
    "Si necesitas algo, Carlos siempre estara ahi. El te ama infinitamente.",
    "Tu haces que Carlos quiera ser mejor persona cada dia. Gracias por existir."
  ]
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export function LoveBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mensaje de bienvenida cuando abre el chat por primera vez
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([{
          id: "welcome",
          role: "assistant",
          content: "Hola Melanis! Soy tu Bot del Amor, creado por Carlos especialmente para ti. Puedo contarte sobre su amor, decirte cosas lindas, o simplemente hacerte compania. Preguntame lo que quieras!"
        }])
        setIsTyping(false)
      }, 1000)
    }
  }, [isOpen, messages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    
    // Simular tiempo de escritura variable
    const typingTime = 800 + Math.random() * 1200
    await new Promise(resolve => setTimeout(resolve, typingTime))
    
    const response = generateResponse(input)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response
    }
    
    setMessages(prev => [...prev, botMessage])
    setIsTyping(false)
  }

  const handleSuggestion = (question: string) => {
    setInput(question)
  }

  const suggestedQuestions = [
    "Quien soy yo?",
    "Quien es Carlos?",
    "Cuanto tiempo llevamos?",
    "Dime algo lindo",
    "Dame un beso",
    "Por que me ama?"
  ]

  return (
    <>
      {/* Floating button con animacion */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-50
          w-16 h-16 rounded-full
          bg-gradient-to-br from-primary via-accent to-primary
          text-white shadow-xl
          flex items-center justify-center
          transition-all duration-500
          hover:scale-110 hover:rotate-12 active:scale-95
          ${isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"}
        `}
        aria-label="Abrir chat de amor"
        style={{
          boxShadow: "0 0 30px rgba(244, 114, 182, 0.5)"
        }}
      >
        <Heart className="w-7 h-7 fill-white animate-pulse" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
          !
        </span>
      </button>

      {/* Chat window mejorado */}
      <div
        className={`
          fixed bottom-0 right-0 z-50
          w-full sm:w-[400px] sm:bottom-6 sm:right-6
          transition-all duration-500 ease-out
          ${isOpen 
            ? "translate-y-0 opacity-100 scale-100" 
            : "translate-y-full sm:translate-y-8 opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <Card className="flex flex-col h-[90vh] sm:h-[550px] sm:rounded-3xl rounded-t-3xl rounded-b-none overflow-hidden border-2 border-primary/40 shadow-2xl bg-background/95 backdrop-blur-lg">
          {/* Header mejorado */}
          <div className="bg-gradient-to-r from-primary via-accent to-primary p-4 flex items-center justify-between relative overflow-hidden">
            {/* Particulas decorativas */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <Heart 
                  key={i} 
                  className="absolute w-4 h-4 text-white/20 fill-white/20 animate-pulse"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Bot del Amor</h4>
                <p className="text-xs text-white/90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Hecho con amor por Carlos
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all hover:rotate-90 relative z-10"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages area mejorada */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-secondary/30 to-background">
            {messages.length === 0 && !isTyping ? (
              <div className="text-center py-8 space-y-6">
                <div className="relative inline-block">
                  <div className="text-6xl animate-bounce">{"💕"}</div>
                  <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                </div>
                <div className="space-y-2">
                  <p className="text-foreground font-medium text-lg">
                    Hola mi amor!
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Soy tu asistente del amor. Preguntame cualquier cosa!
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-w-xs mx-auto">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="text-xs px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 border border-primary/30 hover:border-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[75%] px-4 py-3 rounded-2xl shadow-sm
                      ${message.role === "user"
                        ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-md"
                        : "bg-card border border-primary/20 text-foreground rounded-bl-md"
                      }
                    `}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2">
                  <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
                </div>
                <div className="bg-card border border-primary/20 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" />
                    <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias rapidas cuando hay mensajes */}
          {messages.length > 0 && !isTyping && (
            <div className="px-4 py-2 border-t border-primary/10 bg-card/50">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {["Dime algo lindo", "Te amo", "Un beso", "Un abrazo"].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all whitespace-nowrap flex-shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input mejorado */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-primary/20 bg-card">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribele a tu bot del amor..."
                disabled={isTyping}
                className="flex-1 rounded-full border-2 border-primary/30 focus:border-primary bg-background text-base h-12 px-5"
              />
              <Button
                type="submit"
                disabled={isTyping || !input.trim()}
                size="icon"
                className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 min-w-[48px] min-h-[48px] shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}
