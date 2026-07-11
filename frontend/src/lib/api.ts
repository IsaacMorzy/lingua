export interface FrappeConfig {
  baseUrl: string;
}

export function getFrappeConfig(): FrappeConfig {
  return {
    baseUrl: import.meta.env.PUBLIC_FRAPPE_URL || '',
  };
}

export async function frappeGet<T = unknown>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const { baseUrl } = getFrappeConfig();
  if (!baseUrl) {
    console.warn('PUBLIC_FRAPPE_URL is not set; returning empty result.');
    return { data: [] } as unknown as T;
  }

  const url = new URL(path.startsWith('http') ? path : `${baseUrl}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Frappe API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn('Frappe API request failed:', error);
    return { data: [] } as unknown as T;
  }
}

function getCsrfToken(): string {
  if (typeof document === 'undefined' || typeof document.cookie === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export async function frappePost<T = unknown>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  const { baseUrl } = getFrappeConfig();
  if (!baseUrl) {
    throw new Error('PUBLIC_FRAPPE_URL is not set; cannot POST.');
  }

  const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
  const csrfToken = getCsrfToken();

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(csrfToken ? { 'X-Frappe-CSRF-Token': csrfToken } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Frappe API error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function createLead(data: {
  lead_name: string;
  email_id: string;
  notes?: string;
  source?: string;
}): Promise<unknown> {
  return frappePost('/api/resource/Lead', {
    ...data,
    source: data.source || import.meta.env.PUBLIC_LEAD_SOURCE || 'Website',
  });
}

export async function getResourceList<T = unknown>(
  doctype: string,
  filters?: Record<string, unknown>
): Promise<T[]> {
  const params = new URLSearchParams();
  params.set('fields', '["*"]');
  params.set('limit_page_length', '100');
  if (filters) {
    params.set('filters', JSON.stringify(filters));
  }

  const data = await frappeGet<{ data: T[] }>(`/api/resource/${doctype}?${params.toString()}`);
  return data.data || [];
}

export async function createSubscriber(data: {
  email: string;
  full_name?: string;
  source?: string;
  consent_marketing?: boolean;
}): Promise<unknown> {
  // Route newsletter sign-ups to the existing Lead DocType so transport works
  // out of the box. Use a stable lead-name convention + newsletter source so the
  // admissions team can filter and pluck subscribers from the lead pipeline.
  const fullName = data.full_name?.trim() || data.email.split('@')[0];
  return createLead({
    lead_name: fullName,
    email_id: data.email,
    notes: data.consent_marketing === false
      ? 'Newsletter sign-up (no marketing consent)'
      : 'Newsletter sign-up',
    source: data.source || import.meta.env.PUBLIC_NEWSLETTER_SOURCE || 'Newsletter',
  });
}
