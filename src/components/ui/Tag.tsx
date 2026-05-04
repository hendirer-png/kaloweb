import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export default function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400", className)}>
      <div className="w-1.5 h-1.5 bg-accent rounded-[1px]" />
      {children}
    </div>
  );
}
