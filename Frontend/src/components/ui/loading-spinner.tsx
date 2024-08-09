export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-8 border-t-8 border-primary border-t-secondary" />
    </div>
  );
}
