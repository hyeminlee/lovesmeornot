import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Flower } from "../data/flowers"
import { Petal } from "./Petal"

type FlowerStageProps = {
  flower: Flower
  remainingPetals: number
  onPetalClick: () => void
  interactive: boolean
}

const VIEW = 120
const CORE_R = 22
const PETAL_LEN = 40
const PETAL_W = 11

export function FlowerStage({ flower, remainingPetals, onPetalClick, interactive }: FlowerStageProps) {
  const reduceMotion = useReducedMotion()
  const total = flower.petalCount
  const startId = total - remainingPetals
  const remainingRatio = total > 0 ? remainingPetals / total : 0
  const petalIds = Array.from({ length: Math.max(remainingPetals, 0) }, (_, i) => startId + i)
  const m = Math.max(remainingPetals, 1)

  return (
    <div className="flex w-full flex-col items-center">
      <motion.button
        type="button"
        disabled={!interactive || remainingPetals <= 0}
        onClick={onPetalClick}
        aria-label={
          remainingPetals > 0
            ? `꽃을 눌러 꽃잎 떼기. 남은 꽃잎 ${remainingPetals}개`
            : "꽃잎이 모두 떨어졌습니다"
        }
        whileTap={interactive && remainingPetals > 0 ? { scale: 0.97 } : undefined}
        className="relative flex aspect-square w-[min(100vw-2rem,20rem)] max-w-[320px] items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dream-500 disabled:cursor-default"
      >
        <motion.div
          className="relative h-full w-full"
          animate={
            interactive && remainingPetals > 0 && !reduceMotion
              ? { scale: [1, 1.015, 1] }
              : { scale: 1 }
          }
          transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
        >
          <svg
            viewBox={`-${VIEW} -${VIEW} ${VIEW * 2} ${VIEW * 2}`}
            className="h-full w-full overflow-visible"
            role="img"
            aria-hidden={remainingPetals <= 0}
          >
            <defs>
              <radialGradient id={`core-${flower.id}`} cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="55%" stopColor={flower.centerColor} />
                <stop offset="100%" stopColor={flower.centerColor} stopOpacity={0.85} />
              </radialGradient>
              <filter id={`soft-${flower.id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <AnimatePresence mode="popLayout">
              {petalIds.map((pid, i) => {
                const angleDeg = (i / m) * 360 - 90
                return (
                  <Petal
                    key={pid}
                    angleDeg={angleDeg}
                    fill={flower.petalFill}
                    stroke={flower.petalStroke}
                    radius={CORE_R}
                    petalLength={PETAL_LEN}
                    petalWidth={PETAL_W}
                  />
                )
              })}
            </AnimatePresence>

            <circle
              cx={0}
              cy={0}
              r={CORE_R}
              fill={`url(#core-${flower.id})`}
              filter={`url(#soft-${flower.id})`}
              className="drop-shadow-md"
            />
          </svg>
        </motion.div>
      </motion.button>

      <div className="mt-6 w-full max-w-xs px-1">
        <div
          className="mb-3 h-2 overflow-hidden rounded-full bg-dream-200/80"
          role="progressbar"
          aria-valuenow={remainingPetals}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="남은 꽃잎 비율"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-dream-400 to-indigo-400"
            initial={false}
            animate={{ scaleX: remainingRatio }}
            style={{ originX: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          />
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-1 text-center">
        <p className="text-lg font-semibold text-dream-900">{flower.name}</p>
        <p className="text-sm text-dream-600">
          {remainingPetals > 0 ? (
            <>
              남은 꽃잎 <span className="font-semibold text-dream-800">{remainingPetals}</span>개
            </>
          ) : (
            "모든 꽃잎이 날아갔어요"
          )}
        </p>
        {interactive && remainingPetals > 0 ? (
          <p className="text-xs text-dream-500">꽃을 눌러 한 장씩 떼어 보세요</p>
        ) : null}
      </div>
    </div>
  )
}
