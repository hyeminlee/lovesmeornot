import { motion } from "framer-motion"
import type { Flower } from "../data/flowers"
import { FlowerPicker } from "./FlowerPicker"

type IntroScreenProps = {
  flowers: Flower[]
  concern: string
  onConcernChange: (v: string) => void
  selectedFlowerId: string | null
  onSelectFlower: (id: string) => void
  onStart: () => void
  canStart: boolean
}

export function IntroScreen({
  flowers,
  concern,
  onConcernChange,
  selectedFlowerId,
  onSelectFlower,
  onStart,
  canStart,
}: IntroScreenProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-lg scroll-mt-4 px-4 pt-8 pb-[max(2rem,calc(2rem+var(--keyboard-inset,0px)+env(safe-area-inset-bottom,0px)))] md:pt-14 md:pb-[max(3.5rem,calc(3.5rem+var(--keyboard-inset,0px)+env(safe-area-inset-bottom,0px)))]"
    >
      <header className="mb-8 text-center">
        <p className="mb-2 text-sm font-medium tracking-[0.12em] text-dream-600">한 송이, 한 마디</p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-dream-900 md:text-4xl">꽃잎 점</h1>
        <p className="text-pretty text-sm leading-relaxed text-dream-700 md:text-base">
          질문을 적어도 되고, 비워 둬도 괜찮아요. 꽃을 고른 뒤 잎을 하나씩 떼면 속삭임이 바뀌고, 마지막 잎이
          오늘의 답이에요.
        </p>
      </header>

      <div className="mb-8 rounded-3xl border border-white/80 bg-white/70 p-5 shadow-soft backdrop-blur-sm md:p-6">
        <label htmlFor="concern" className="mb-2 block text-sm font-medium text-dream-800">
          무엇이 궁금하신가요? <span className="font-normal text-dream-500">(선택)</span>
        </label>
        <textarea
          id="concern"
          name="concern"
          rows={3}
          value={concern}
          onChange={(e) => onConcernChange(e.target.value)}
          aria-describedby="concern-hint"
          placeholder={
            "비워 두셔도 돼요. 적을 때 예: 그 사람이 나를 좋아할까?, 이번 선택이 맞을까?"
          }
          className="w-full resize-y rounded-2xl border border-dream-200/80 bg-white/90 px-4 py-3 text-base text-dream-900 placeholder:text-dream-400 focus:border-dream-400 focus:outline-none focus:ring-2 focus:ring-dream-300/60"
          onFocus={(e) => {
            requestAnimationFrame(() => {
              e.target.scrollIntoView({ block: "center", behavior: "smooth" })
            })
          }}
        />
        <p id="concern-hint" className="mt-2 text-xs text-dream-600">
          적으면 꽃잎마다 그 문장 뒤에 「맞다 / 아니다」가 붙어요. 비워 두면 「맞다 / 아니다」만
          속삭여요.
        </p>
      </div>

      <div className="mb-8 rounded-3xl border border-white/80 bg-white/70 p-5 shadow-soft backdrop-blur-sm md:p-6">
        <FlowerPicker
          flowers={flowers}
          selectedId={selectedFlowerId}
          onSelect={onSelectFlower}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          disabled={!canStart}
          onClick={onStart}
          className="w-full max-w-sm rounded-2xl bg-gradient-to-r from-dream-500 to-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition enabled:hover:brightness-105 enabled:focus-visible:outline enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-dream-500 disabled:cursor-not-allowed disabled:opacity-45"
        >
          꽃과 함께 시작하기
        </button>
        {!canStart ? (
          <span className="text-xs text-dream-600">꽃을 선택하면 시작할 수 있어요.</span>
        ) : null}
      </div>
    </motion.section>
  )
}
