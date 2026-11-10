import { cn } from '@/lib/utils';

/** Kırmızı–beyaz–lacivert dönen berber direği şeridi. */
export default function BarberPole({ className }) {
  return <span aria-hidden="true" className={cn('b-pole block', className)} />;
}