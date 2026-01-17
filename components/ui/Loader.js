'use client';

export default function Loader({ text = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[90vh]">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {text && <span className="text-slate-500 font-medium tracking-wider text-sm animate-pulse">{text}</span>}
    </div>
  );
}

export function PageLoader({ text = 'Loading' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Loader text={text} />
    </div>
  );
}

export function CardLoader({ text = 'Loading' }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader text={text} />
    </div>
  );
}
