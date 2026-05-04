import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Tag from '../ui/Tag';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const teamReviews = [
  { name: 'Sarah Wilson', role: 'Founder, EcoBrand', quote: 'They gave simple paths to hard puzzles, removing all delays while building fresh projects.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400' },
  { name: 'John Peterson', role: 'CEO, TechFlow', quote: 'They brought clarity to complex problems, breaking down barriers and delivering innovative solutions.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Emily Chen', role: 'Director, Zenith', quote: 'Their insight resolved difficult hurdles, opening new paths and creating highly effective growth.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
  { name: 'Michael Ross', role: 'Founder, CraftCo', quote: 'We found focus for tricky requirements, cutting through noise and providing truly exceptional value.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Alex Rivera', role: 'CEO, Gusto', quote: 'They gave simple paths to hard puzzles, removing all delays while building fresh projects.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
];

export default function TeamReviews() {
  return (
    <section id="team-reviews" className="py-32 bg-white pb-56">
      <div className="container-custom">
        <motion.div {...fadeIn} className="mb-24">
          <Tag className="mb-8">TESTIMONI</Tag>
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-black">Apa kata mereka?</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {teamReviews.map((review, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className="aspect-[10/14] rounded-[3.5rem] overflow-hidden mb-10 filter grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-lg bg-gray-50">
                <img src={review.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={review.name} />
              </div>
              <div className="flex flex-col flex-1">
                <div className="mb-6 relative">
                  <Quote size={20} className="text-accent mb-6 opacity-40" />
                  <p className="text-sm font-medium leading-relaxed text-gray-700 italic">
                    "{review.quote}"
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">-{review.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
