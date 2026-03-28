import { motion } from "framer-motion"

type FinalResultPanelProps = {
  message: string
  onRestart: () => void
  /** `inline`: stacked export for HTML → Framer; `modal`: full-screen overlay (default). */
  layout?: "modal" | "inline"
}

function ResultCardBody({
  message,
  onRestart,
  headingId,
}: {
  message: string
  onRestart: () => void
  headingId: string
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
      <h2 id={headingId} className="mb-8 text-2xl font-semibold leading-snug text-dream-900 md:text-3xl">
        {message}
      </h2>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-2xl bg-gradient-to-r from-dream-500 to-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dream-500"
        onClick={onRestart}
      >
        다시 시작하기
      </motion.button>
    </>
  )
}

export function FinalResultPanel({ message, onRestart, layout = "modal" }: FinalResultPanelProps) {
  const headingId = layout === "inline" ? "final-result-heading-inline" : "final-result-heading"

  if (layout === "inline") {
    return (
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white via-dream-50 to-dream-100 p-8 text-center shadow-float"
        data-framer-name="Result card"
      >
        <ResultCardBody message={message} onRestart={onRestart} headingId={headingId} />
      </div>
    )
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dream-900/35 p-4 backdrop-blur-[2px]"
      data-framer-name="Result overlay"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.08 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white via-dream-50 to-dream-100 p-8 text-center shadow-float"
        data-framer-name="Result dialog"
      >
        <ResultCardBody message={message} onRestart={onRestart} headingId={headingId} />
      </motion.div>
    </motion.div>
  )
}
