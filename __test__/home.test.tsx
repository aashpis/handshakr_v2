import { render, screen } from '@testing-library/react';
import Home from '../app/page'; 

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Simplified mock of next/image for tests
    return <img {...props} />;
  },
}));

jest.mock('@/_ui/login-form', () => () => <div data-testid="login-form" />);
jest.mock('@/_ui/create-new-account-button', () => () => (
  <button data-testid="create-account-button">Create New Account</button>
));

describe('Home Page', () => {
  it('renders banner image, login form, and create account button', () => {
    render(<Home />);

    // Banner image
    const bannerImg = screen.getByAltText(/handshakr banner/i);
    expect(bannerImg).toBeInTheDocument();

    // LoginForm component
    expect(screen.getByTestId('login-form')).toBeInTheDocument();

    // Divider text
    expect(screen.getByText(/or/i)).toBeInTheDocument();

    // CreateNewAccountButton component
    expect(screen.getByTestId('create-account-button')).toBeInTheDocument();
  });
});
