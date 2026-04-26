import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react"

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

const allImages = [
  "https://cdn.poehali.dev/files/6a3f5d04-0734-449d-afb2-97b55c3e8813.jpg",
  "https://cdn.poehali.dev/files/734691a8-6ea2-45d5-8e64-9fbac34d930b.jpg",
  "https://cdn.poehali.dev/files/f79ebd73-3ad3-4f9c-ab41-15d90becf59a.jpg",
  "https://cdn.poehali.dev/files/553646a2-0bcd-4b9c-8f30-9f65d9ad57d6.jpg",
  "https://cdn.poehali.dev/files/4d7fdb26-b334-4430-8cb1-e74495cb3118.jpg",
  "https://cdn.poehali.dev/files/38978637-ed4d-4bf6-8ede-36ee51dde5fd.jpg",
  "https://cdn.poehali.dev/files/4fcd225a-64a9-4182-aba0-1de7b2efc30a.jpg",
  "https://cdn.poehali.dev/files/29836f82-039d-4367-beae-4f7a60f59c58.jpg",
  "https://cdn.poehali.dev/files/9c0e46f5-4d5a-4aed-a32c-aeb6e6d0c7d0.jpg",
  "https://cdn.poehali.dev/files/be8822d3-5ea6-400c-b576-afff6f6730c6.jpg",
  "https://cdn.poehali.dev/files/13d87c6a-da0b-4e47-901a-cd098b4af6f5.jpg",
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [showAllModal, setShowAllModal] = useState(false)
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxImage) {
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "ArrowLeft") prevImage()
        if (e.key === "Escape") setLightboxImage(null)
      }
      if (showAllModal && e.key === "Escape") setShowAllModal(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightboxImage, lightboxIndex, showAllModal])

  const openLightbox = (images: string[], index: number) => {
    setLightboxIndex(index)
    setLightboxImage(images[index])
  }

  const nextImage = () => {
    const next = (lightboxIndex + 1) % allImages.length
    setLightboxIndex(next)
    setLightboxImage(allImages[next])
  }

  const prevImage = () => {
    const prev = (lightboxIndex - 1 + allImages.length) % allImages.length
    setLightboxIndex(prev)
    setLightboxImage(allImages[prev])
  }

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-4 right-4 text-white z-10" onClick={() => setLightboxImage(null)}>
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage() }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage() }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <span className="absolute bottom-4 text-white/60 text-sm">{lightboxIndex + 1} / {allImages.length}</span>
        </div>
      )}

      {showAllModal && (
        <div
          className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowAllModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10 rounded-t-2xl">
              <h3 className="text-xl font-medium">Все проекты</h3>
              <button onClick={() => setShowAllModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6">
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => { openLightbox(allImages, i); setShowAllModal(false) }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Реализованные проекты</h2>
          </div>
          <button
            onClick={() => setShowAllModal(true)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все проекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
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
                onClick={() => openLightbox(allImages, index)}
              >
                <img
                  src={project.image}
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
