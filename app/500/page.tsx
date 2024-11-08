import ErrorPageWrapper from '@/components/shared/ErrorPageWrapper';

export default function ServerError() {
  return (
    <ErrorPageWrapper
      title="500"
      subtitle="Server Error"
      description="Oops! Something went wrong on our end. Please try again later."
    />
  );
}
