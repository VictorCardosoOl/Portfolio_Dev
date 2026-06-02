import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ScrollProgressBar } from '../components/ui/ScrollProgressBar';

// Mock GSAP to prevent actual animation runs or failures during testing
vi.mock('gsap', () => {
  return {
    default: {
      registerPlugin: vi.fn(),
      quickTo: vi.fn(() => vi.fn()),
      to: vi.fn(),
      context: vi.fn((cb) => {
        cb();
        return { revert: vi.fn() };
      }),
    },
    gsap: {
      registerPlugin: vi.fn(),
      quickTo: vi.fn(() => vi.fn()),
      to: vi.fn(),
      context: vi.fn((cb) => {
        cb();
        return { revert: vi.fn() };
      }),
    },
  };
});

// Mock GSAP's ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => {
  return {
    ScrollTrigger: {
      update: vi.fn(),
    },
    default: {
      update: vi.fn(),
    },
  };
});

describe('MagneticButton Component', () => {
  it('renders children correctly', () => {
    render(
      <MagneticButton>
        <span data-testid="child">Click Me</span>
      </MagneticButton>
    );

    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Click Me');
  });

  it('renders button with correct role and tabIndex for accessibility', () => {
    render(
      <MagneticButton>
        <span>A11y Check</span>
      </MagneticButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('tabindex', '0');
  });
});

describe('ScrollProgressBar Component', () => {
  it('renders the progress bar element with correct classes', () => {
    const { container } = render(<ScrollProgressBar />);
    const progressBar = container.firstChild;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('fixed', 'top-0', 'scale-x-0');
  });
});
