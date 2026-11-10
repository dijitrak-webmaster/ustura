import { cn } from '@/lib/utils';

/**
 * Renders its children once, then again flipped and faded on the other side of
 * a mirror edge. Pass only static visual content (type, pictures, numbers).
 */
export default function Mirrored({ children, className, fade = 'h-[110px] md:h-[190px]' }) {
  return (
    <div className={className}>
      <div className="relative">
        {children}
        <span className="ayna-edge absolute bottom-0 left-0 right-0" aria-hidden="true" />
      </div>
      <div className={cn('ayna-reflect overflow-hidden', fade)} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}