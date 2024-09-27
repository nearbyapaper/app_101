import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VIText from '../src/utility/VIText';

describe('VIText', () => {
  it('renders correctly with the given title', () => {
    const {getByText} = render(<VIText title="Hello World" />);

    expect(getByText('Hello World')).toBeTruthy();
  });
});
