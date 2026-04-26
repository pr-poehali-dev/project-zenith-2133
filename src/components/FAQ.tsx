import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит ремонт под ключ?",
    answer:
      "Стоимость работ «под ключ» начинается от 15 000 руб./м². Точная цена зависит от объёма работ, выбранных материалов и сложности проекта. Для каждого клиента мы формируем индивидуальную смету с закреплёнными ценами — никаких сюрпризов в процессе.",
  },
  {
    question: "Сколько времени занимает ремонт?",
    answer:
      "Сроки зависят от площади и вида работ. Перед стартом мы фиксируем точные сроки в договоре.",
  },
  {
    question: "Какую гарантию вы даёте?",
    answer:
      "Мы даём гарантию 5 лет на все виды выполненных работ. Это не просто слова — мы уверены в качестве каждого нашего проекта и в профессионализме своей команды.",
  },
  {
    question: "Работаете ли вы с коммерческими помещениями?",
    answer:
      "Да, мы работаем как с жилыми, так и с коммерческими объектами: офисы, магазины, рестораны, склады. Подход одинаковый — индивидуальная смета, фиксированные сроки и гарантия качества.",
  },
  {
    question: "Нужен ли мне дизайн-проект перед ремонтом?",
    answer:
      "Дизайн-проект помогает избежать ошибок и сэкономить бюджет. Мы предоставляем услугу дизайн-проекта.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Просто свяжитесь с нами — по телефону или почте.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}