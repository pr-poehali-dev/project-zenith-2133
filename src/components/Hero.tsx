export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/files/aefbe5e6-6344-49dc-a103-781a4f5a084d.jpg"
          alt="Светлый минималистичный интерьер после ремонта"
          className="w-full h-full object-cover object-center mx-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-72 md:mb-60 lg:mb-80">
          <p className="text-sm tracking-[0.3em] uppercase text-center text-secondary mb-0">{"Ремонт и отделка под ключ"}</p>

          <h1 className="text-7xl font-medium text-balance text-center text-white mb-0 tracking-tight leading-[0.9] lg:text-8xl">
            {"Создаём пространство,"}
            <br />
            <span className="text-orange-200">{"где вам комфортно"}</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
