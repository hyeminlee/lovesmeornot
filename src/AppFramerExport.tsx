import { IntroScreen } from "./components/IntroScreen"
import { FinalResultPanel } from "./components/FinalResultPanel"
import { FlowerStage } from "./components/FlowerStage"
import { flowers } from "./data/flowers"

const SAMPLE_CONCERN = "예: 그 사람이 나를 좋아할까?"
const SAMPLE_RESULT = "그 사람이 나를 좋아할까? 맞다"

/** Stacked UI for HTML → Framer copy: add `?framer=1` to the dev server URL. */
export function AppFramerExport() {
  const flower = flowers[0]!

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden"
      data-framer-name="Page — Framer export"
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        data-framer-name="Ambient background"
      >
        <div className="absolute -left-1/4 top-0 h-[min(70vh,520px)] w-[min(90vw,480px)] rounded-full bg-gradient-to-br from-sky-200/50 via-dream-200/40 to-transparent blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[min(60vh,440px)] w-[min(85vw,420px)] rounded-full bg-gradient-to-tl from-blue-200/45 via-cyan-100/35 to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-100/35 blur-2xl" />
      </div>

      <main
        className="relative mx-auto flex max-w-2xl flex-col gap-16 px-4 py-10 md:gap-20 md:py-14"
        data-framer-name="Main column"
      >
        <section data-framer-name="Screen — Intro">
          <IntroScreen
            flowers={flowers}
            concern={SAMPLE_CONCERN}
            onConcernChange={() => {}}
            selectedFlowerId={flower.id}
            onSelectFlower={() => {}}
            onStart={() => {}}
            canStart
          />
        </section>

        <section
          data-framer-name="Screen — Play"
          className="border-t border-dream-200/60 pt-12 md:pt-16"
        >
          <header className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-dream-900 md:text-2xl">꽃잎을 하나씩 떼어 보세요</h2>
            <p className="mt-1 text-sm text-dream-600">꽃을 누를 때마다 속삭임이 바뀌어요</p>
          </header>
          <div className="flex flex-col items-center justify-center">
            <FlowerStage
              flower={flower}
              remainingPetals={flower.petalCount}
              onPetalClick={() => {}}
              interactive={false}
            />
          </div>
        </section>

        <section
          data-framer-name="Screen — Result"
          className="flex flex-col items-center border-t border-dream-200/60 pt-12 md:pt-16"
        >
          <FinalResultPanel
            message={SAMPLE_RESULT}
            onRestart={() => {}}
            layout="inline"
          />
        </section>
      </main>
    </div>
  )
}
