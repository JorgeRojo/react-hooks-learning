import _get from 'lodash/get';

export const getNumberFromEvent = event => {
  const value = _get(event, 'target.value', '');
  if (value === '') {
    return '';
  }
  const number = parseInt(value, 10);
  return !isNaN(number) ? number : 0;
};
