// __test__/handshake-history.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../app/history/page';
import { Handshake } from '@/_lib/definitions';

jest.mock('@/_ui/page-header', () => ({ title, subTitle }: any) => (
  <div data-testid="page-header">
    <h1>{title}</h1>
    <p>{subTitle}</p>
  </div>
));

jest.mock('@/_ui/handshake-card', () => (props: any) => (
  <div data-testid="handshake-card">{props.signedDate}</div>
));

jest.mock('@/_lib/userDataAccess', () => ({
  getUserProfileAxiosRequest: jest.fn(),
  fetchInitiatedHandshakes: jest.fn(),
  fetchReceivedHandshakes: jest.fn(),
}));

import {
  getUserProfileAxiosRequest,
  fetchInitiatedHandshakes,
  fetchReceivedHandshakes,
} from '@/_lib/userDataAccess';

describe('Handshakes History Page', () => {
    const initiated: Handshake[] = [
        {
          handshakeName: 'Handshake A',
          encryptedDetails: 'Encrypted A',
          signedDate: '2023-01-01',
          completedDate: '2023-01-02',
          handshakeStatus: 'Completed',
          initiatorUsername: 'alice',
          acceptorUsername: 'bob',
        },
      ];
      
      const received: Handshake[] = [
        {
          handshakeName: 'Handshake B',
          encryptedDetails: 'Encrypted B',
          signedDate: '2023-01-03',
          completedDate: '2023-01-04',
          handshakeStatus: 'Completed',
          initiatorUsername: 'charlie',
          acceptorUsername: 'alice',
        },
        {
          handshakeName: 'Handshake C',
          encryptedDetails: 'Encrypted C',
          signedDate: '2023-01-02',
          completedDate: '2023-10-20',
          handshakeStatus: 'Pending',
          initiatorUsername: 'david',
          acceptorUsername: 'alice',
        },
      ];
      

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading and then renders handshakes in descending order by signed date', async () => {
    (getUserProfileAxiosRequest as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'testuser' } },
    });

    (fetchInitiatedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: initiated,
    });

    (fetchReceivedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: received,
    });

    render(<Page />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      const cards = screen.getAllByTestId('handshake-card');
      expect(cards.length).toBe(3);
      expect(cards[0]).toHaveTextContent('2023-01-03');
      expect(cards[1]).toHaveTextContent('2023-01-02');
      expect(cards[2]).toHaveTextContent('2023-01-01');      
    });
  });

  it('displays an error if user profile fails', async () => {
    (getUserProfileAxiosRequest as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Profile load failed',
    });

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/profile load failed/i)).toBeInTheDocument();
    });
  });

  it('displays handshakes even if one of the fetches fails', async () => {
    (getUserProfileAxiosRequest as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { data: { username: 'testuser' } },
    });

    (fetchInitiatedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'Initiated error',
    });

    (fetchReceivedHandshakes as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: received,
    });

    render(<Page />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('handshake-card');
      expect(cards.length).toBe(2);
    });
  });

  it('displays error message on exception', async () => {
    (getUserProfileAxiosRequest as jest.Mock).mockRejectedValueOnce(
      new Error('Unexpected failure')
    );

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/unexpected failure/i)).toBeInTheDocument();
    });
  });
});
