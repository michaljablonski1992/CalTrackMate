import ErrorPageWrapper from '@/components/shared/ErrorPageWrapper';

export default function NotFound() {
  return (
    <ErrorPageWrapper
      title="404"
      subtitle="Page Not Found"
      description="Sorry, the page you are looking for does not exist or has been moved."
    />
  );
}
