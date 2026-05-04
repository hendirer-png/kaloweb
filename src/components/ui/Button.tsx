import * as React from 'react';
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'black' | 'arrow';
  className?: string;
  onClick?: (e?: any) => void | Promise<void>;
  disabled?: boolean;
}

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 overflow-hidden px-6 py-3";
  
  const variants = {
    primary: "bg-accent text-black hover:bg-accent/90 shadow-lg hover:shadow-accent/20",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl",
    black: "bg-black text-white hover:bg-black/90 px-8 py-4 shadow-xl hover:shadow-black/20",
    arrow: "bg-accent text-black p-0 overflow-visible shadow-lg hover:shadow-accent/20"
  };

  if (variant === 'arrow') {
    return (
      <motion.button
        whileHover={{ 
          scale: 1.03,
          backgroundColor: "#efec2b" 
        }}
        whileTap={{ scale: 0.95 }}
        className={cn("group flex items-center gap-0 bg-accent rounded-full pr-1 pl-6 py-1 h-12 transition-all duration-300", variants[variant], className)}
        {...props}
      >
        <span className="text-sm font-bold uppercase tracking-widest">{children}</span>
        <motion.div 
          className="ml-2 w-10 h-10 bg-black text-accent rounded-full flex items-center justify-center"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
