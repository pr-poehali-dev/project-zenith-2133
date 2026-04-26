import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const SEND_CALLBACK_URL = "https://functions.poehali.dev/78865b96-9a23-4c9e-b4fc-9da463d29ecb"

export function CallToAction() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return
    setStatus("loading")
    try {
      const res = await fetch(SEND_CALLBACK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setPhone("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Начать проект</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Готовы к ремонту
            <br />
            своей <HighlightedText>мечты</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Оставьте заявку — мы бесплатно проконсультируем.
          </p>

          {status === "success" ? (
            <div className="inline-flex items-center gap-3 bg-primary-foreground/10 border border-primary-foreground/30 px-8 py-5 text-primary-foreground text-lg">
              Заявка принята! Скоро свяжемся с вами.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 px-5 py-4 text-sm outline-none focus:border-primary-foreground/50 transition-colors"
              />
              <input
                type="tel"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 px-5 py-4 text-sm outline-none focus:border-primary-foreground/50 transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !name.trim() || !phone.trim()}
                className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
              >
                {status === "loading" ? "Отправка..." : "Получить обратную связь"}
                {status !== "loading" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
          )}

          {status === "error" && (
            <p className="mt-4 text-red-400 text-sm">Что-то пошло не так. Позвоните нам: +7 (981) 935-85-31</p>
          )}
        </div>
      </div>
    </section>
  )
}
