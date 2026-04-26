import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, X } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Ванная комната",
    category: "Ремонт квартиры под ключ",
    location: "Москва",
    year: "2024",
    image: "https://cdn.poehali.dev/files/6a3f5d04-0734-449d-afb2-97b55c3e8813.jpg",
  },
  {
    id: 2,
    title: "Кухня-гостиная",
    category: "Ремонт квартиры под ключ",
    location: "Москва",
    year: "2024",
    image: "https://cdn.poehali.dev/files/734691a8-6ea2-45d5-8e64-9fbac34d930b.jpg",
  },
  {
    id: 3,
    title: "Прихожая",
    category: "Отделка под ключ",
    location: "Москва",
    year: "2023",
    image: "https://cdn.poehali.dev/files/f79ebd73-3ad3-4f9c-ab41-15d90becf59a.jpg",
  },
  {
    id: 4,
    title: "Кухня в классическом стиле",
    category: "Дизайн и ремонт под ключ",
    location: "Москва",
    year: "2024",
    image: "https://cdn.poehali.dev/files/553646a2-0bcd-4b9c-8f30-9f65d9ad57d6.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-4 right-4 text-white" onClick={() => setLightboxImage(null)}>
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Реализованные проекты</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все проекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                ref={(el) => (imageRefs.current[index] = el)}
                className="relative overflow-hidden aspect-[4/3] mb-6"
                onClick={() => setLightboxImage(project.image)}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>


            </article>
          ))}
        </div>
      </div>
    </section>
  )
}