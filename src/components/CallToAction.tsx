import Icon from "@/components/ui/icon"
import { HighlightedText } from "./HighlightedText"

export function CallToAction() {
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

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Свяжитесь с нами — мы бесплатно проконсультируем.
          </p>

          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={22} className="text-orange-400 shrink-0" />
              <span className="text-xl md:text-2xl font-bold text-white tracking-wide select-none">
                +7 (981) 935-85-31
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={22} className="text-orange-400 shrink-0" />
              <span className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide select-none break-all">
                vikingremspb@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}