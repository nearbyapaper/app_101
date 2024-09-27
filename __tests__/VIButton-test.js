import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VIButton from '../src/utility/VIButton';

describe('VIButton', () => {
  it('renders correctly with the given title', () => {
    const {getByText} = render(<VIButton title="Hello World" />);

    expect(getByText('Hello World')).toBeTruthy();
  });

  it('calls onPress when the button is clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<VIButton title="Test" action={onPressMock} />);

    fireEvent.press(getByText('Test'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onPress and callback when the button is clicked', async () => {
    const onPressMock = jest.fn().mockResolvedValue(); // Mocked action that resolves
    const callbackMock = jest.fn(); // Mocked callback function

    const {getByText} = render(
      <VIButton title="Test" action={onPressMock} callback={callbackMock} />,
    );

    fireEvent.press(getByText('Test')); // Trigger button press

    // Wait for all promises to resolve
    await new Promise(setImmediate); // Ensures that async actions have time to complete

    expect(onPressMock).toHaveBeenCalledTimes(1); // Expect onPress to have been called once
    expect(callbackMock).toHaveBeenCalledTimes(1); // Expect callback to have been called once
  });
});
