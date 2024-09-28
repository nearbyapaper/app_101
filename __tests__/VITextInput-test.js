import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VITextInput from '../src/utility/VITextInput';

describe('VITextInput', () => {
  it('renders correctly with the given label', () => {
    const {getByText, getByDisplayValue} = render(
      <VITextInput label="Test Label" value="Initial Value" />,
    );

    // Test if the label is rendered correctly
    expect(getByText('Test Label')).toBeTruthy();

    // Test if the input field is rendered with the correct initial value
    expect(getByDisplayValue('Initial Value')).toBeTruthy();
  });

  it('calls the action when the input changes', () => {
    const actionMock = jest.fn();
    const {getByDisplayValue, getByTestId} = render(
      <VITextInput
        label="Test Label"
        value="Initial Value"
        action={actionMock}
      />,
    );

    // Simulate input change
    fireEvent.changeText(getByDisplayValue('Initial Value'), 'New Value');

    // Check if the mock function is called with the new value
    expect(actionMock).toHaveBeenCalledWith('New Value');
  });
});
