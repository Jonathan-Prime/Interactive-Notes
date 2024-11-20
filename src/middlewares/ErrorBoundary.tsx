import React, { Component, ErrorInfo } from 'react';
import { useRouter } from 'next/router';

type PerfectErrorBoundaryState = {
  hasError: boolean;
};

type PerfectErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorFallbackProps = {
  resetErrorBoundary: () => void;
};

function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  const router = useRouter();

  function handleRetry() {
    resetErrorBoundary();
    router.reload();
  }

  return (
    <div>
      <h2>Something went wrong</h2>
      <p>There was an error in this section of the app.</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
}

class PerfectErrorBoundary extends Component<
  PerfectErrorBoundaryProps,
  PerfectErrorBoundaryState
> {
  constructor(props: PerfectErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <ErrorFallback resetErrorBoundary={this.handleReset} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default PerfectErrorBoundary;










// import React from 'react';
// import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
// import { useRouter } from 'next/router';

// type ErrorFallbackProps = FallbackProps & {
//   resetErrorBoundary: () => void;
// };

// function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
//   const router = useRouter();

//   function handleRetry() {
//     resetErrorBoundary();
//     router.reload();
//   }

//   return (
//     <div>
//       <h2>Something went wrong</h2>
//       <p>{error.message}</p>
//       <button onClick={handleRetry}>Retry</button>
//     </div>
//   );
// }

// function PerfectErrorBoundary({ children }: { children: React.ReactNode }) {
//   function handleReset() {
//     window.location.reload();
//   }

//   return (
//     <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
//       {children}
//     </ErrorBoundary>
//   );
// }

// export default PerfectErrorBoundary;
