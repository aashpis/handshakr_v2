// __test__/received-handshakes.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../app/received-handshakes/page';
import { Handshake } from '@/_lib/definitions';

// Mock child components
jest.mock('@/_ui/page-header', () => () => (
  <div data-testid="page-header">My Received Handshakes</div>
));
jest.mock('@/_ui/handshake-card', () => (props: Handshake) => (
  <div data-testid="handshake-card">{props.handshakeName}</div>
));

// Mock data access functions
jest.mock('@/_lib/userDataAccess', () => ({
  getUserProfileAxiosRequest: jest.fn(),
  fetchReceivedHandshakes: jest.fn(),
}));

import {
  getUserProfileAxiosRequest as fetchUserProfile,
  fetchReceivedHandshakes,
} from '@/_lib/userDataAccess';

describe('Received Handshakes Page', () => {
  const mockHandshake: Handshake = {
    handshakeName: 'Test Handshake',
    encryptedDetails: 'Encrypted Data',
    signedDate: '2023-01-01',
    completedDate: '2023-01-02',
    handshakeStatus: 'Completed',
    initiatorUsername: 'alice',
    acceptorUsername: 'bob',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'test error',
    });

    render(<Page />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error message when profile fetch fails', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'User fetch failed',
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/user fetch failed/i)).toBeInTheDocument();
    });
  });

  it('renders error message when no username returned', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: {} },
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/no username found error/i)).toBeInTheDocument();
    });
  });

  it('renders error if handshake fetch fails', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'bob' } },
    });
    (fetchReceivedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Handshake fetch failed',
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/handshake fetch failed/i)).toBeInTheDocument();
    });
  });

  it('renders handshake cards on success', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'bob' } },
    });
    (fetchReceivedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: [mockHandshake],
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByTestId('handshake-card')).toHaveTextContent('Test Handshake');
    });
  });
});
