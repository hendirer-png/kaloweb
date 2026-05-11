import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import { Check, Star, Leaf, Rocket, Loader2 } from 'lucide-react';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

export default function Pricing() {
  const { getContent } = useContent();
  const sectionData = getContent('home_pricing');

  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('status', 'Active')
        .order('price', { ascending: true });
      if (error) throw error;
      setPlans(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = (plan: any) => {
    navigate('/checkout', { state: { selectedPlan: plan } });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const getIcon = (idx: number) => {
    if (idx === 0) return <Leaf className="text-black" />;
    if (idx === 1) return <Star className="text-accent" />;
    return <Rocket className="text-black" />;
  };

  const tag = sectionData?.tag || "Daftar Harga";
  const title = sectionData?.title || "Investasi yang sepadan untuk bisnis";
  const highlightText = sectionData?.highlightText || "sepadan untuk bisnis";
  const description = sectionData?.description || "Pilih paket yang paling sesuai dengan skala bisnis dan kebutuhan target market Anda.";
  const buttonText = sectionData?.buttonText || "Get Started";

  // Helper to render title with highlight
  const renderTitle = () => {
    if (!highlightText) return title;
    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-black/30">{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16 md:mb-24">
          <motion.div
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Tag className="mb-8 lowercase">{tag}</Tag>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium max-w-3xl mb-5 md:mb-8 tracking-tighter leading-[1.05]">
              {renderTitle()}
            </h2>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg max-w-xl mb-8 md:mb-12 font-medium leading-relaxed">
              {description}
            </p>
          </motion.div>
          <Button variant="arrow">{buttonText}</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          {loading ? (
             <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-accent" size={40} /></div>
          ) : plans.map((plan, idx) => {
            const isPopular = plan.name.includes('Growth');
            return (
            <ScrollReveal 
              key={plan.id} 
              direction="up"
              delay={idx * 0.1}
              once={false}
              className="group"
            >
              <motion.div
                whileHover={{ 
                  y: -12,
                  backgroundColor: isPopular ? "#ffffff" : "#f8fafc",
                  borderColor: isPopular ? "#d6fd70" : "#cbd5e1"
                }}
                transition={{ duration: 0.3 }}
                className={`relative bg-white rounded-[1.25rem] sm:rounded-[2rem] border transition-all duration-300 ${isPopular ? 'border-accent shadow-[0_32px_64px_-16px_rgba(214,253,112,0.1)] pt-6 p-4 sm:pt-12 sm:p-8 md:p-10' : 'border-gray-100 p-4 sm:p-8 md:p-10 h-full shadow-sm hover:shadow-xl'}`}
              >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${isPopular ? 'bg-black' : 'bg-accent'}`}>
                  <span className="scale-75 sm:scale-100">{getIcon(idx)}</span>
                </div>
                <span className="font-bold text-[9px] sm:text-xs uppercase tracking-[0.2em]">{plan.name}</span>
              </div>

              <p className="text-gray-500 text-[10px] sm:text-sm mb-4 sm:mb-8 leading-relaxed">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-4 sm:mb-6 md:mb-10">
                <span className="text-lg sm:text-2xl md:text-4xl font-display font-bold text-black">Rp</span>
                <span className="text-lg sm:text-2xl md:text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-gray-400 text-[9px] sm:text-xs md:text-sm">/bulan</span>
              </div>

              <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-12">
                {plan.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-gray-400 sm:hidden" />
                      <Check size={10} className="text-gray-400 hidden sm:block" />
                    </div>
                    <span className="text-[10px] sm:text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="black" className="w-full text-[10px] sm:text-sm py-2 sm:py-3" onClick={() => handleGetStarted(plan)}>Get Started</Button>
            </motion.div>
          </ScrollReveal>
          )})}
        </div>
    </div>
  </section>
  );
}
