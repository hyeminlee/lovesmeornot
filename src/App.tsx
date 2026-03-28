import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useMemo, useRef, useState } from "react"
import { AppFramerExport } from "./AppFramerExport"
import { FinalResultPanel } from "./components/FinalResultPanel"
import { FlowerStage } from "./components/FlowerStage"
import { IntroScreen } from "./components/IntroScreen"
import { ToastMessage } from "./components/ToastMessage"
import { flowers } from "./data/flowers"

type Phase = "intro" | "playing" | "result"

function buildMessage(concern: string, index: number): string {
  const q = concern.trim()
  const suffix = index % 2 === 0 ? "맞다" : "아니다"
  return `${q} ${suffix}`
}

function AppMain() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [concern, setConcern] = useState("")
  const [flowerId, setFlowerId] = useState<string | null>(null)
  const [remainingPetals, setRemainingPetals] = useState(0)
  const [toastText, setToastText] = useState<string | null>(null)
  const [finalMessage, setFinalMessage] = useState("")
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Avoids double-decrement if the last petal is clicked twice before React re-renders. */
  const remainingRef = useRef(0)

  const flower = useMemo(
    () => (flowerId ? flowers.find((f) => f.id === flowerId) : undefined),
    [flowerId],
  )

  const canStart = concern.trim().length > 0 && flowerId !== null

  const reset = useCallback(() => {
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current)
      resultTimerRef.current = null
    }
    setPhase("intro")
    setConcern("")
    setFlowerId(null)
    setRemainingPetals(0)
    remainingRef.current = 0
    setToastText(null)
    setFinalMessage("")
  }, [])

  const handleStart = () => {
    if (!canStart || !flowerId) return
    const f = flowers.find((x) => x.id === flowerId)
    if (!f) return
    remainingRef.current = f.petalCount
    setRemainingPetals(f.petalCount)
    setToastText(null)
    setFinalMessage("")
    setPhase("playing")
  }

  const handlePetalClick = () => {
    if (phase !== "playing" || !flower) return

    const total = flower.petalCount
    const prev = remainingRef.current
    if (prev <= 0) return

    const next = prev - 1
    remainingRef.current = next
    setRemainingPetals(next)

    const msgIndex = total - next - 1
    const msg = buildMessage(concern, msgIndex)
    setToastText(msg)

    if (next === 0) {
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current)
      resultTimerRef.current = setTimeout(() => {
        setToastText(null)
        setFinalMessage(msg)
        setPhase("result")
        resultTimerRef.current = null
      }, 700)
    }
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden" data-framer-name="Page">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        data-framer-name="Ambient background"
      >
        <div className="absolute -left-1/4 top-0 h-[min(70vh,520px)] w-[min(90vw,480px)] rounded-full bg-gradient-to-br from-sky-200/50 via-dream-200/40 to-transparent blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[min(60vh,440px)] w-[min(85vw,420px)] rounded-full bg-gradient-to-tl from-blue-200/45 via-cyan-100/35 to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-100/35 blur-2xl" />
      </div>

      <main className="relative mx-auto flex min-h-dvh max-w-2xl flex-col" data-framer-name="Main">
        <AnimatePresence mode="wait">
          {phase === "intro" ? (
            <IntroScreen
              key="intro"
              flowers={flowers}
              concern={concern}
              onConcernChange={setConcern}
              selectedFlowerId={flowerId}
              onSelectFlower={setFlowerId}
              onStart={handleStart}
              canStart={canStart}
            />
          ) : flower ? (
            <motion.div
              key="stage"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-1 flex-col px-4 py-8 md:py-12 ${phase === "result" ? "opacity-40" : ""}`}
              data-framer-name="Play stage"
            >
              <header className="mb-6 text-center">
                <h2 className="text-xl font-semibold text-dream-900 md:text-2xl">꽃잎을 하나씩 떼어 보세요</h2>
                <p className="mt-1 text-sm text-dream-600">꽃을 누를 때마다 속삭임이 바뀌어요</p>
              </header>
              <div className="flex flex-1 flex-col items-center justify-center">
                <FlowerStage
                  flower={flower}
                  remainingPetals={remainingPetals}
                  onPetalClick={handlePetalClick}
                  interactive={phase === "playing"}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {phase === "playing" ? <ToastMessage text={toastText} /> : null}
      {phase === "result" && finalMessage ? (
        <FinalResultPanel message={finalMessage} onRestart={reset} />
      ) : null}
    </div>
  )
}

export default function App() {
  const [framerExport] = useState(() => {
    if (typeof window === "undefined") return false
    return new URLSearchParams(window.location.search).get("framer") === "1"
  })

  if (framerExport) return <AppFramerExport />

  return <AppMain />
}
