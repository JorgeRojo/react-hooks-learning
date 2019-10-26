import _get from 'lodash/get';
import { shallowEqual } from 'react-redux';

/**
 * Compare the properties between two objects included in propNames array
 * @param {[String]} propsNames
 * @return {(prevProps: any, prevProps: any) => boolean}
 */
export const areShallowDiffProps = propsNames => (prevProps, nextProps) =>
  propsNames.every(key => shallowEqual(prevProps[key], nextProps[key]));

export const getNumberFromEvent = event => {
  const value = _get(event, 'target.value', '');
  if (value === '') {
    return '';
  }
  const number = parseInt(value, 10);
  return !isNaN(number) ? number : 0;
};
