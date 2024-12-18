import { cn } from '@sewell_stephens/cn';

interface TreeIconProps {
  isFirst: boolean;
  isLast: boolean;
  className?: string;
}

export function TreeIcon({ className, isFirst, isLast }: TreeIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'aspect-[1/2] w-5 fill-none stroke-slate-300 dark:stroke-slate-600',
        className
      )}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      viewBox="0 0 12 24"
    >
      <path d={`M 2 ${isFirst ? 2 : 0} L 2 12 L 10 12`} />

      {!isLast && <path d="M 2 12 L 2 24" />}
    </svg>
  );
}
