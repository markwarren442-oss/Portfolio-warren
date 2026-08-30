import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      id="progress-bar"
      style={{ width: `${progress}%` }}
    ></div>
  );
}
