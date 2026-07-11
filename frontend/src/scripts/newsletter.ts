import { createSubscriber } from '@/lib/api';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function initNewsletterForm() {
  const form = document.getElementById('newsletter-form') as HTMLFormElement | null;
  const status = document.getElementById('newsletter-status');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();

    if (!email) {
      setStatus(status, 'Please enter your email address.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      setStatus(status, 'Please enter a valid email address.', 'error');
      return;
    }

    setStatus(status, 'Sending...', 'loading');

    try {
      await createSubscriber({
        email,
        consent_marketing: true,
      });
      setStatus(status, 'Subscribed. Check your inbox for confirmation.', 'success');
      form.reset();
    } catch (error) {
      setStatus(
        status,
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        'error'
      );
    }
  });
}

type StatusKind = 'loading' | 'success' | 'error';

function setStatus(
  node: HTMLElement | null,
  message: string,
  kind: StatusKind
): void {
  if (!node) return;
  const classes: Record<StatusKind, string> = {
    loading: 'text-sm text-slate-300',
    success: 'text-sm text-emerald-400',
    error: 'text-sm text-red-400',
  };
  node.className = `mt-2 ${classes[kind]}`;
  node.textContent = message;
  node.classList.remove('hidden');
}
