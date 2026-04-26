import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Опыт более 10 лет",
    description:
      "Более десяти лет мы реализуем проекты любой сложности — от косметического ремонта до полного преображения коммерческих пространств. Десятки довольных клиентов — лучшее тому подтверждение.",
  },
  {
    title: "Прозрачность и индивидуальный подход",
    description:
      "Для каждого проекта формируется индивидуальная смета с закреплёнными ценами. Никаких скрытых платежей — только честное ценообразование с первого дня.",
  },
  {
    title: "Соблюдение сроков и бюджета",
    description:
      "Мы гарантируем выполнение всех работ точно в срок и строго в рамках утверждённого бюджета. Вы всегда знаете, что происходит на объекте.",
  },
  {
    title: "Гарантия 5 лет",
    description: "Мы настолько уверены в качестве своей работы, что даём гарантию на все виды работ сроком 5 лет. Это лучшее подтверждение нашей ответственности.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Почему нам доверяют</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Ремонт с
              <br />
              <HighlightedText>гарантией</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/files/b258a7fb-a127-41d4-a45c-ae77564acb7e.jpg"
                alt="Современный интерьер гостиной"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Ремонт — это больше, чем строительные работы. Мы создаём пространство, где вам будет по-настоящему комфортно жить и работать.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}