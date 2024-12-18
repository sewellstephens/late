'use client';

import { cn } from '@sewell_stephens/cn';
import { usePathname } from 'next/navigation';

import { useConfig } from '@/hooks/use-config';
import { useMounted } from '@/hooks/use-mounted';

interface ThemeBodyProps extends React.ComponentProps<'body'> {
  defaultTheme?: string;
}

export function Body({
  children,
  className,
  defaultTheme,
  ...props
}: ThemeBodyProps) {
  const [config] = useConfig();
  const pathname = usePathname();
  const mounted = useMounted();

  const theme =
    mounted && pathname === '/'
      ? `theme-${config.theme ?? defaultTheme}`
      : `theme-${defaultTheme}`;

  return (
    <body
      className={cn(theme, className)}
      style={
        mounted
          ? ({
              '--radius': `${config.radius ?? 0.5}rem`,
            } as React.CSSProperties)
          : undefined
      }
      {...props}
    >
      {children}
    </body>
  );
}
