import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
  it('should render the button with the correct text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should apply the correct classes for primary variant and medium size', () => {
    const { container } = render(<Button variant="primary" size="md">Primary Button</Button>);
    expect(container.firstChild).toHaveClass('btn btn-primary btn-md');
  });

  it('should apply the correct classes for secondary variant and small size', () => {
    const { container } = render(<Button variant="secondary" size="sm">Secondary Button</Button>);
    expect(container.firstChild).toHaveClass('btn btn-secondary btn-sm');
  });

  it('should apply the correct classes for danger variant and large size', () => {
    const { container } = render(<Button variant="danger" size="lg">Danger Button</Button>);
    expect(container.firstChild).toHaveClass('btn btn-danger btn-lg');
  });

  it('should apply the disabled class when disabled', () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    expect(container.firstChild).toHaveClass('btn-disabled');
  });

  it('should call the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
