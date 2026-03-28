import { motion } from "framer-motion"

type PetalProps = {
  angleDeg: number
  fill: string
  stroke: string
  radius: number
  petalLength: number
  petalWidth: number
}

export function Petal({ angleDeg, fill, stroke, radius, petalLength, petalWidth }: PetalProps) {
  const cy = -(radius + petalLength)
  return (
    <g transform={`rotate(${angleDeg})`}>
      <motion.g
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { type: "spring", stiffness: 400, damping: 30 },
        }}
        exit={{
          opacity: 0,
          y: 36,
          scale: 0.88,
          transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          transformOrigin: `0px ${cy}px`,
        }}
      >
        <ellipse
          cx={0}
          cy={cy}
          rx={petalWidth}
          ry={petalLength}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.25}
          className="drop-shadow-sm"
        />
      </motion.g>
    </g>
  )
}
