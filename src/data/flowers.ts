export type Flower = {
  id: string
  name: string
  petalCount: number
  /** Tailwind gradient classes for card + flower accents */
  gradientFrom: string
  gradientTo: string
  centerColor: string
  petalFill: string
  petalStroke: string
  label: string
}

/** Edit petal counts and names here. */
export const flowers: Flower[] = [
  {
    id: "daisy",
    name: "데이지",
    petalCount: 12,
    gradientFrom: "from-sky-50",
    gradientTo: "to-sky-100/90",
    centerColor: "#0284c7",
    petalFill: "#e0f2fe",
    petalStroke: "#7dd3fc",
    label: "맑은 하늘 데이지",
  },
  {
    id: "rose",
    name: "장미",
    petalCount: 18,
    gradientFrom: "from-blue-50",
    gradientTo: "to-indigo-100/90",
    centerColor: "#2563eb",
    petalFill: "#dbeafe",
    petalStroke: "#93c5fd",
    label: "깊은 바다 장미",
  },
  {
    id: "violet",
    name: "바이올렛",
    petalCount: 9,
    gradientFrom: "from-indigo-50",
    gradientTo: "to-cyan-100/90",
    centerColor: "#4f46e5",
    petalFill: "#e0e7ff",
    petalStroke: "#a5b4fc",
    label: "고요한 바이올렛",
  },
]
