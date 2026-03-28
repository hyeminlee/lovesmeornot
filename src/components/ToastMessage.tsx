import { AnimatePresence, motion } from "framer-motion"

type ToastMessageProps = {
  text: string | null
}

export function ToastMessage({ text }: ToastMessageProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-10"
      aria-live="polite"
      aria-atomic="true"
      data-framer-name="Toast"
    >
      <AnimatePresence mode="wait">
        {text ? (
          <motion.div
            key={text}
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(3px)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none max-w-lg rounded-2xl border border-white/60 bg-white/85 px-5 py-3 text-center text-base font-medium text-dream-900 shadow-float backdrop-blur-md md:text-lg"
          >
            {text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
