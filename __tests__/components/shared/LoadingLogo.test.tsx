// __tests__/LoadingLogo.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingLogo from '@/components/shared/LoadingLogo';
import 'next/image';

// Mock the Next.js Image component (optional if Next.js image handling is irrelevant in test)
jest.mock('next/image', () => {
  const MockedImage = (props: any) => <img {...props} />;
  MockedImage.displayName = 'NextImage'; // Add a display name
  return MockedImage;
});

describe('LoadingLogo Component', () => {
  it('should render the image with the default size of 200', () => {
    render(<LoadingLogo />);

    // Check if the image is rendered with the correct src and default size
    const logoImage = screen.getByAltText('Loading Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo1.png');
    expect(logoImage).toHaveAttribute('width', '200');
    expect(logoImage).toHaveAttribute('height', '200');
  });

  it('should render the image with a custom size', () => {
    render(<LoadingLogo size={300} />);

    // Check if the image is rendered with the correct custom size
    const logoImage = screen.getByAltText('Loading Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo1.png');
    expect(logoImage).toHaveAttribute('width', '300');
    expect(logoImage).toHaveAttribute('height', '300');
  });
});
