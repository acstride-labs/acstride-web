import {cva, type VariantProps} from 'class-variance-authority';
import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

// Source-owned button styles following the shadcn/ui composition pattern.
export const buttonVariants = cva('button', {
  variants: {variant: {default: 'button-primary', outline: 'button-outline', light: 'button-light'}},
  defaultVariants: {variant: 'default'}
});
export function buttonClass(variant?: VariantProps<typeof buttonVariants>['variant'], className?: string) {
  return twMerge(clsx(buttonVariants({variant}), className));
}
