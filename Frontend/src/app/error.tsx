"use client"; // Error components must be Client Components

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
