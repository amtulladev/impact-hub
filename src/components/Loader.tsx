export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-transparent ${className}`}
    >
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
