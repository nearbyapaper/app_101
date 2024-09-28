const SAVE_BUSINESS = 'SAVE_BUSINESS';

export const saveBusiness = ({Business}) => ({
  type: SAVE_BUSINESS,
  payload: Business,
});
