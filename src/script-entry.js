import Tracker from './core/tracker';

if (typeof window !== 'undefined') {
  const tracker = new Tracker();
  window.tracker = tracker;
} else {
  console.error('init shadow-tracker error, no window object');
}
