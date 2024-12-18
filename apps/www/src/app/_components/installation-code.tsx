// Pre is deeply coupled to Contentlayer, so we need a wrapper to make it work
import * as React from 'react';
import type { ReactNode } from 'react';
import { Prism, type SyntaxHighlighterProps } from 'react-syntax-highlighter';

import { cn } from '@sewell_stephens/cn';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyButton, CopyNpmCommandButton } from '@/components/copy-button';
import * as Typography from '@/components/typography';

const SyntaxHighlighter =
  Prism as typeof React.Component<SyntaxHighlighterProps>;

export function InstallationCode({
  bash,
  children,
  code,
}: {
  bash?: boolean;
  children?: ReactNode;
  code: string;
}) {
  const npmCommand = code.startsWith('npm install');

  return (
    <div>
      {!!children && <Typography.P className="mt-6">{children}</Typography.P>}

      <div className="relative">
        <SyntaxHighlighter
          className="rounded-lg border !py-4"
          language={bash ? 'bash' : 'typescript'}
          showLineNumbers={false}
          style={theme}
        >
          {code}
        </SyntaxHighlighter>

        {npmCommand ? (
          <CopyNpmCommandButton
            className={cn('absolute right-4 top-4')}
            commands={{
              __bunCommand__: code.replaceAll('npm install', 'bun add'),
              __npmCommand__: code,
              __pnpmCommand__: code.replaceAll('npm install', 'pnpm add'),
              __yarnCommand__: code.replaceAll('npm install', 'yarn add'),
            }}
          />
        ) : (
          <CopyButton className={cn('absolute right-4 top-4')} value={code} />
        )}
      </div>
    </div>
  );
}
