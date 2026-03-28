import { motion } from "framer-motion"

const HEADING_ID = "final-result-heading"

type FinalResultPanelProps = {
  message: string
  onRestartFromScratch: () => void
  onRestartWithSameQuestion: () => void
  canReplayWithSameQuestion: boolean
}

function ResultCardBody({
  message,
  onRestartFromScratch,
  onRestartWithSameQuestion,
  canReplayWithSameQuestion,
}: {
  message: string
  onRestartFromScratch: () => void
  onRestartWithSameQuestion: () => void
  canReplayWithSameQuestion: boolean
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-dream-200/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-sky-200/45 blur-3xl"
        aria-hidden
      />

      <p className="mb-2 text-sm font-medium tracking-wide text-dream-600">꽃이 전하는 답</p>
      <h2 id={HEADING_ID} className="mb-8 text-2xl font-semibold leading-snug text-dream-900 md:text-3xl">
        {message}
      </h2>

      <div className="flex flex-col gap-3">
        <motion.button
          type="button"
          disabled={!canReplayWithSameQuestion}
          title={
            canReplayWithSameQuestion
              ? undefined
              : "질문을 적었을 때만 같은 질문으로 다시 할 수 있어요"
          }
          whileHover={canReplayWithSameQuestion ? { scale: 1.02 } : undefined}
          whileTap={canReplayWithSameQuestion ? { scale: 0.98 } : undefined}
          className={
            canReplayWithSameQuestion
              ? "w-full rounded-2xl bg-gradient-to-r from-dream-500 to-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition enabled:hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dream-500"
              : "w-full cursor-not-allowed rounded-2xl border border-dream-200/80 bg-dream-100/80 px-6 py-3.5 text-base font-semibold text-dream-400 shadow-sm"
          }
          onClick={() => {
            if (canReplayWithSameQuestion) onRestartWithSameQuestion()
          }}
        >
          같은 질문으로 다시
        </motion.button>
        {!canReplayWithSameQuestion ? (
          <p className="text-center text-xs text-dream-500">
            질문을 비워 두셨다면 아래에서 처음부터 다시 시작해 주세요
          </p>
        ) : null}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl border-2 border-dream-200/90 bg-white/80 px-6 py-3.5 text-base font-semibold text-dream-800 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dream-500"
          onClick={onRestartFromScratch}
        >
          처음부터
        </motion.button>
      </div>
    </>
  )
}

export function FinalResultPanel({
  message,
  onRestartFromScratch,
  onRestartWithSameQuestion,
  canReplayWithSameQuestion,
}: FinalResultPanelProps) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={HEADING_ID}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dream-900/35 p-4 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.08 }}
        className="relative max-h-[min(90dvh,calc(100dvh-var(--keyboard-inset,0px)-2rem))] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white via-dream-50 to-dream-100 p-8 text-center shadow-float"
      >
        <ResultCardBody
          message={message}
          onRestartFromScratch={onRestartFromScratch}
          onRestartWithSameQuestion={onRestartWithSameQuestion}
          canReplayWithSameQuestion={canReplayWithSameQuestion}
        />
      </motion.div>
    </motion.div>
  )
}
