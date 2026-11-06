export interface AdminIconOption {
  label: string;
  value: string;
}

/** Friendly labels for Font Awesome classes used across the site. */
export const ADMIN_ICONS: AdminIconOption[] = [
  { label: 'Ship / Ocean', value: 'fa-solid fa-ship' },
  { label: 'Plane / Air', value: 'fa-solid fa-plane-departure' },
  { label: 'Truck / Land', value: 'fa-solid fa-truck' },
  { label: 'Fast truck', value: 'fa-solid fa-truck-fast' },
  { label: 'Warehouse', value: 'fa-solid fa-warehouse' },
  { label: 'Box / Cargo', value: 'fa-solid fa-box' },
  { label: 'Boxes', value: 'fa-solid fa-boxes-stacked' },
  { label: 'Archive box', value: 'fa-solid fa-box-archive' },
  { label: 'Shield / Secure', value: 'fa-solid fa-shield-halved' },
  { label: 'File shield / Customs', value: 'fa-solid fa-file-shield' },
  { label: 'Globe', value: 'fa-solid fa-earth-americas' },
  { label: 'File / Quote', value: 'fa-solid fa-file-lines' },
  { label: 'Check circle', value: 'fa-solid fa-circle-check' },
  { label: 'Location', value: 'fa-solid fa-location-dot' },
  { label: 'Phone', value: 'fa-solid fa-phone' },
  { label: 'Envelope', value: 'fa-solid fa-envelope' },
  { label: 'Clock', value: 'fa-regular fa-clock' },
  { label: 'Users / Team', value: 'fa-solid fa-users' },
  { label: 'Handshake', value: 'fa-solid fa-handshake' },
  { label: 'Chart / Growth', value: 'fa-solid fa-chart-line' },
  { label: 'Train', value: 'fa-solid fa-train' },
  { label: 'Cubes / Stock', value: 'fa-solid fa-cubes' },
  { label: 'Clipboard', value: 'fa-solid fa-clipboard-list' },
  { label: 'Route', value: 'fa-solid fa-route' }
];

export function iconLabel(value: string): string {
  return ADMIN_ICONS.find((item) => item.value === value)?.label || value || 'Custom icon';
}
