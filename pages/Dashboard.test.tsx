// FIX: Add missing React import to resolve 'Cannot find namespace React' error, which is required for using JSX and React types like React.ReactNode.
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';

// Mocking recharts to prevent errors in JSDOM environment which lacks layouting APIs.
// We only need to mock the ResponsiveContainer to provide a static size.
vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual<typeof import('recharts')>('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div className="recharts-responsive-container" style={{ width: 800, height: 400 }}>
        {children}
      </div>
    ),
  };
});

describe('Dashboard Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the main heading "Executive Overview"', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    const heading = screen.getByRole('heading', { 
      name: /executive overview/i 
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('renders all 5 KPI cards', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Portfolio Value/i)).toBeInTheDocument();
    expect(screen.getByText(/Avg. Occupancy/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Work Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Energy Usage/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects At Risk/i)).toBeInTheDocument();
  });

  it('renders the Utility Consumption Trends chart', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Utility Consumption Trends/i)).toBeInTheDocument();
  });

  it('renders the Critical Alerts section', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Critical Alerts/i)).toBeInTheDocument();
  });
});
