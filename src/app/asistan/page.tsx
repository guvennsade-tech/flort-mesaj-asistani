import { AssistantApp } from "@/components/app-shell";
import { ErrorBoundary } from "@/components/error-boundary";

export default function AsistanPage() {
  return (
    <ErrorBoundary>
      <AssistantApp />
    </ErrorBoundary>
  );
}
