// Fuente: https://alignui.com/docs/v1.2/ui/divider (código real, verbatim)
// Extraído para estudio — no se importa en la app. Ver README.md de esta carpeta.

import { tv, type VariantProps } from '@/utils/tv';

const DIVIDER_ROOT_NAME = 'DividerRoot';

export const dividerVariants = tv({
  base: 'relative flex w-full items-center',
  variants: {
    variant: {
      line: 'h-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-stroke-soft-200',
      'line-spacing': ['h-1', 'before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-stroke-soft-200'],
      'line-text': [
        'gap-2.5',
        'text-subheading-2xs text-text-soft-400',
        'before:h-px before:w-full before:flex-1 before:bg-stroke-soft-200',
        'after:h-px after:w-full after:flex-1 after:bg-stroke-soft-200',
      ],
    },
  },
  defaultVariants: { variant: 'line' },
});

function Divider({ className, variant, ...rest }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof dividerVariants>) {
  return <div role='separator' className={dividerVariants({ variant, class: className })} {...rest} />;
}
Divider.displayName = DIVIDER_ROOT_NAME;

export { Divider as Root };
