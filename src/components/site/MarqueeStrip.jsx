import { marqueeItems } from '@/data/salonContent';

export default function MarqueeStrip() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-[#08080a] py-4">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 label-mono text-[10px] text-foreground/50">
            {item}
            <span className="h-1 w-1 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}