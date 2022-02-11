import { Tracker } from './core/tracker';

const tracker = new Tracker();

if (typeof window !== 'undefined') {
  (window as any).tracker = tracker;
} else {
  console.error('init shadow-tracker error, no window object');
}

export default tracker;
