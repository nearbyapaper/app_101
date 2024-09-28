import businessReducer, {
  saveBusiness,
  loadBusinessStart,
  loadBusinessError,
} from '../src/redux/reducers/business-reducer';

describe('Business Reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentBusiness: {},
      saveBusinessLoading: false,
      saveBusinessError: null,
    };
  });

  test('should return the initial state when passed an empty action', () => {
    const result = businessReducer(undefined, {type: ''});
    expect(result).toEqual(initialState);
  });

  test('should handle saveBusiness action', () => {
    const businessData = {name: 'Test Business', value: '100,000'};
    const action = saveBusiness(businessData);
    const result = businessReducer(initialState, action);

    expect(result.currentBusiness).toEqual(businessData);
    expect(result.saveBusinessLoading).toBe(false); // After saving, loading should be false
    expect(result.saveBusinessError).toBeNull(); // After saving, error should be null
  });

  test('should handle loadBusinessStart action', () => {
    const action = loadBusinessStart();
    const result = businessReducer(initialState, action);

    expect(result.saveBusinessLoading).toBe(true); // Expect that loading is set to true
    expect(result.saveBusinessError).toBeNull(); // Error should be reset to null
  });

  test('should handle loadBusinessError action', () => {
    const errorMessage = 'An error occurred';
    const action = loadBusinessError(errorMessage);
    const result = businessReducer(initialState, action);

    expect(result.saveBusinessLoading).toBe(false); // Loading should stop after error
    expect(result.saveBusinessError).toEqual(errorMessage); // Error should be set to the message
  });

  test('should not affect state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    const result = businessReducer(initialState, action);

    expect(result).toEqual(initialState); // Should return the same state for unknown actions
  });
});
