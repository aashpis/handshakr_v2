// __test__/initiated-handshakes.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../app/initiated-handshakes/page';
import { Handshake } from '@/_lib/definitions';

// Mock child components
jest.mock('@/_ui/page-header', () => ({ title, subTitle }: any) => (
  <div data-testid="page-header">
    <h1>{title}</h1>
    <p>{subTitle}</p>
  </div>
));

jest.mock('@/_ui/handshake-card', () => (props: Handshake) => (
  <div data-testid="handshake-card">{props.signedDate}</div>
));

// Mock service functions
jest.mock('@/_lib/userDataAccess', () => ({
  getUserProfileAxiosRequest: jest.fn(),
  fetchInitiatedHandshakes: jest.fn(),
}));

import {
  getUserProfileAxiosRequest as fetchUserProfile,
  fetchInitiatedHandshakes,
} from '@/_lib/userDataAccess';

describe('Initiated Handshakes Page', () => {
  const mockHandshakes: Handshake[] = [
    {
        handshakeName: 'Test Handshake',
        encryptedDetails: 'Encrypted Data',
        signedDate: '2023-01-01',
        completedDate: '2023-01-02',
        handshakeStatus: 'Completed',
        initiatorUsername: 'alice',
        acceptorUsername: 'bob',
      },
     {
        handshakeName: 'Test Handshake 2',
        encryptedDetails: 'Encrypted Data',
        signedDate: '2023-01-01',
        completedDate: '2023-01-25',
        handshakeStatus: 'Completed',
        initiatorUsername: 'alice',
        acceptorUsername: 'bob',
      }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header and loading state initially', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'alice' } },
    });
    (fetchInitiatedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: [],
    });

    render(<Page />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
    });
  });

  it('displays error if user profile fails', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Profile error',
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/profile error/i)).toBeInTheDocument();
    });
  });

  it('displays error if handshake fetch fails', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'alice' } },
    });
    (fetchInitiatedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Fetch error',
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/fetch error/i)).toBeInTheDocument();
    });
  });

  it('renders handshake cards on success', async () => {
    (fetchUserProfile as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'alice' } },
    });
    (fetchInitiatedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: mockHandshakes,
    });

    render(<Page />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('handshake-card');
      expect(cards.length).toBe(2);
      expect(cards[0]).toHaveTextContent('2025-04-01');
      expect(cards[1]).toHaveTextContent('2025-04-02');
    });
  });
});
