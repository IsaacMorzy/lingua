import { createLead } from '@/lib/api';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status');

  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const leadName = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!leadName || !email || !message) {
      status.className = 'text-sm text-red-700';
      status.textContent = 'Please fill in all fields.';
      status.classList.remove('hidden');
      return;
    }

    if (!isValidEmail(email)) {
      status.className = 'text-sm text-red-700';
      status.textContent = 'Please enter a valid email address.';
      status.classList.remove('hidden');
      return;
    }

    status.className = 'text-sm text-slate-600';
    status.textContent = 'Sending...';
    status.classList.remove('hidden');

    try {
      await createLead({
        lead_name: leadName,
        email_id: email,
        notes: message,
        source: 'Website',
      });
      status.className = 'text-sm text-green-700';
      status.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    } catch (error) {
      status.className = 'text-sm text-red-700';
      status.textContent =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    }
  });
}
