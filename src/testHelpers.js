import React from 'react';

export const mockComponent = (name, props) => (
  <code name={name}>{JSON.stringify(props)}</code>
);
