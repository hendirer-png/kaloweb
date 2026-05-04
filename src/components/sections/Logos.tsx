import { motion } from 'motion/react';

export default function LogoStrip() {
  const logos = [
    'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum'
  ];

  return (
    <section className="py-12 border-y border-gray-100 overflow-hidden bg-white">
      <div className="flex gap-20 whitespace-nowrap animate-marquee">
        <div className="flex gap-20 shrink-0 min-w-full">
          {logos.concat(logos).map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 text-gray-300 transition-colors hover:text-black cursor-default">
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">LI</div>
              <span className="font-display font-extrabold uppercase tracking-tighter text-2xl">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
