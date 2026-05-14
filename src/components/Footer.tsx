export default function Footer() {
  return (
    <footer className="bg-black px-6 pb-10">
      <div className="max-w-5xl mx-auto">
        <div className="h-px w-full mb-8 bg-white/10" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[0.75rem] font-light text-white/40">
            © 2026 Aether Apparel. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[0.75rem] font-light text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
