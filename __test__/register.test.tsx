import { render, screen } from '@testing-library/react';
import RegisterPage from '../app/register/page'; // adjust the path if needed

// Mock next/image to render a normal <img> in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock the UserRegistrationForm component
jest.mock('@/_ui/user-registration-form', () => () => (
  <form data-testid="user-registration-form">Mock Form</form>
));

describe('Register Page', () => {
  it('renders the banner image and user registration form', () => {
    render(<RegisterPage />);

    // Check for the banner image
    const bannerImg = screen.getByAltText(/handshakr banner/i);
    expect(bannerImg).toBeInTheDocument();
    expect(bannerImg).toHaveAttribute('src', '/handshakr-banner.png');

    // Check for the mocked user registration form
    const form = screen.getByTestId('user-registration-form');
    expect(form).toBeInTheDocument();
  });
});
