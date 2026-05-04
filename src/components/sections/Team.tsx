import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  },
  viewport: { once: true, margin: "-100px" }
};

export default function Team() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        setTeam(data || []);
      } catch (err) {
        console.error('Error fetching team:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-14 sm:py-20 md:py-24 bg-white border-t border-gray-100">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <motion.div {...fadeIn}>
            <Tag className="mb-4 md:mb-5 lowercase">TEAMS</Tag>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight">Meet our teams</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="black" className="rounded-full px-8 py-3.5 group text-xs tracking-widest whitespace-nowrap">
              CONTACT US <ArrowUpRight className="ml-2 group-hover:rotate-45 transition-transform" size={16} />
            </Button>
          </motion.div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10"
          >
            {team.map((member, i) => (
                <motion.div 
                  key={member.id || i} 
                  variants={fadeIn}
                  className="bg-gray-50 rounded-[1.5rem] overflow-hidden group p-2 transition-colors hover:bg-gray-100"
                >
                  <div className="p-6 md:p-8 flex justify-between items-start">
                      <div>
                        <h3 className="text-lg md:text-xl font-display font-bold leading-tight mb-1.5 tracking-tight">{member.name}</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{member.role}</p>
                      </div>
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer group-hover:bg-accent group-hover:text-black transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                  </div>
                  <div className="aspect-[4/5] rounded-[1rem] overflow-hidden m-2">
                      <img src={member.image_url || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400'} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && team.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No team members found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
