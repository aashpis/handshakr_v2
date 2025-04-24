// __test__/price-analyzer.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../app/price-analyzer/page';
import { PriceStats } from '@/_lib/definitions';

// Mock UI components
jest.mock('@/_ui/page-header', () => () => (
  <div data-testid="page-header">Price Analyzer</div>
));
jest.mock('@/_ui/price-input-form', () => ({ onSubmit, loading }: any) => (
  <div>
    <button onClick={() => onSubmit('Test Item')} disabled={loading}>
      Submit
    </button>
  </div>
));
jest.mock('@/_ui/price-stats-card', () => ({ itemName, max, mean, median, min }: PriceStats & { itemName: string }) => (
  <div data-testid="price-stats-card">{`${itemName}: ${min} - ${max}`}</div>
));
jest.mock('@/_ui/price-graphs', () => ({ histogramUrl, medianGraphUrl }: any) => (
  <div>
    <div data-testid="histogram">{histogramUrl}</div>
    <div data-testid="median-graph">{medianGraphUrl}</div>
  </div>
));

// Mock service functions
jest.mock('@/_lib/priceAnalyzerService', () => ({
  fetchPriceStats: jest.fn(),
  fetchPriceHistogram: jest.fn(),
  fetchMedianPriceGraph: jest.fn(),
}));

import {
  fetchPriceStats,
  fetchPriceHistogram,
  fetchMedianPriceGraph,
} from '@/_lib/priceAnalyzerService';

describe('Price Analyzer Page', () => {
  const mockStats = {
    max: 100,
    mean: 60,
    median: 55,
    min: 20,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial UI with form and header', () => {
    render(<Page />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('handles error from fetchPriceStats', async () => {
    (fetchPriceStats as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Price stats failed',
    });

    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/price stats failed/i)).toBeInTheDocument();
    });
  });

  it('handles malformed price stats object', async () => {
    (fetchPriceStats as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: ['Test Item', null],
    });

    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/malformed stats object/i)).toBeInTheDocument();
    });
  });

  it('handles error from fetchPriceHistogram', async () => {
    (fetchPriceStats as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: ['Test Item', mockStats],
    });
    (fetchPriceHistogram as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Histogram failed',
    });

    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/histogram failed/i)).toBeInTheDocument();
    });
  });

  it('renders stats and graphs on successful fetches', async () => {
    (fetchPriceStats as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: ['Resolved Item', mockStats],
    });
    (fetchPriceHistogram as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: 'https://histogram.img',
    });
    (fetchMedianPriceGraph as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: 'https://median.img',
    });

    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByTestId('price-stats-card')).toHaveTextContent('Resolved Item: 20 - 100');
      expect(screen.getByTestId('histogram')).toHaveTextContent('https://histogram.img');
      expect(screen.getByTestId('median-graph')).toHaveTextContent('https://median.img');
    });
  });
});
