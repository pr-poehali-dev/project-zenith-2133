export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="font-bold text-xl tracking-tight">Viking<span className="text-orange-400">Remont</span></span>
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Ремонт и отделка помещений любой сложности. Работаем более 10 лет. Гарантия 5 лет на все виды работ.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Компания</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Проекты
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Связь</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span>vikingremspb@gmail.com</span>
              </li>
              <li>
                <span>+7 (981) 935-85-31</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-sm text-muted-foreground">
          <p>© 2026 VikingRemont. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
