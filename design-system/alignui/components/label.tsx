// Fuente: https://alignui.com/docs/v1.2/ui/label (código real, verbatim)
// Extraído para estudio — no se importa en la app. Ver README.md de esta carpeta.
'use client';

import * as React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import { cn } from '@/utils/cn';

const LabelRoot = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> & { disabled?: boolean }
>(({ className, disabled, ...rest }, forwardedRef) => {
  return (
    <LabelPrimitives.Root
      ref={forwardedRef}
      className={cn('group cursor-pointer text-label-sm text-text-strong-950', 'flex items-center gap-px', 'aria-disabled:text-text-disabled-300', className)}
      aria-disabled={disabled}
      {...rest}
    />
  );
});
LabelRoot.displayName = 'LabelRoot';

function LabelAsterisk({ className, children, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-primary-base', 'group-aria-disabled:text-text-disabled-300', className)} {...rest}>
      {children || '*'}
    </span>
  );
}

function LabelSub({ children, className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-paragraph-sm text-text-sub-600', 'group-aria-disabled:text-text-disabled-300', className)} {...rest}>
      {children}
    </span>
  );
}

export { LabelRoot as Root, LabelAsterisk as Asterisk, LabelSub as Sub };
