import { describe, expect, test } from 'vitest';
import { buttonStyles } from '@/styles/button';
import { cn } from '@/utils/cn';

describe('buttonStyles CVA factory', () => {
  test('inverted compound uses on-dark focus ring (not on-light)', () => {
    const result = buttonStyles({ variant: 'primary', appearance: 'inverted' });
    expect(result).toContain('focus:ring-button-inverted-focus-ring');
    // Guard against accidental swap to the on-light token: the default
    // `inverted` appearance is for white-on-coloured backgrounds, where a
    // dark focus ring would be invisible. The override pattern is
    // documented as a comment on the inverted compound in button.ts.
    expect(result).not.toContain('focus:ring-button-inverted-focus-ring-on-light');
    expect(result).toContain('bg-white');
    expect(result).toContain('text-primary');
  });

  test('inverted + cn class: override injects the on-light focus ring', () => {
    // Documents the escape-hatch pattern from the comment on the inverted
    // compound in button.ts: passing the on-light focus ring through cn()
    // appends it to the class string. The visual override wins because
    // global.css declares the on-light CSS variable after the on-dark one
    // (stylesheet source order) — that is a Tailwind/global.css concern,
    // not a CVA concern, and is not asserted here. This test only
    // verifies the override class string is present in the result.
    const result = cn(
      buttonStyles({ variant: 'primary', appearance: 'inverted' }),
      'focus:ring-button-inverted-focus-ring-on-light'
    );
    expect(result).toContain('focus:ring-button-inverted-focus-ring-on-light');
  });

  test('primary fill uses primary background and text tokens', () => {
    const result = buttonStyles({ variant: 'primary', appearance: 'fill' });
    expect(result).toContain('bg-button-primary-background');
    expect(result).toContain('text-button-primary-text');
    expect(result).toContain('focus:ring-button-primary-focus-ring');
  });

  test('primary outline uses outline border and text tokens', () => {
    const result = buttonStyles({ variant: 'primary', appearance: 'outline' });
    expect(result).toContain('border-button-outline-border');
    expect(result).toContain('text-button-outline-text');
    expect(result).toContain('focus:ring-button-outline-focus-ring');
  });

  test('danger variant uses error tokens across fill and outline', () => {
    const fill = buttonStyles({ variant: 'danger', appearance: 'fill' });
    expect(fill).toContain('bg-button-error-background');
    expect(fill).toContain('text-button-error-text');
    const outline = buttonStyles({ variant: 'danger', appearance: 'outline' });
    expect(outline).toContain('border-button-error-outline-border');
  });

  test('success variant uses success tokens on fill', () => {
    const result = buttonStyles({ variant: 'success', appearance: 'fill' });
    expect(result).toContain('bg-button-success-background');
    expect(result).toContain('text-button-success-text');
  });

  test('iconOnly size applies square sizing on md', () => {
    const result = buttonStyles({ variant: 'primary', iconOnly: true, size: 'md' });
    expect(result).toContain('size-11');
  });

  test('size lg applies larger svg icon', () => {
    const result = buttonStyles({ variant: 'primary', size: 'lg' });
    expect(result).toContain('[&>svg]:size-6');
  });
});
