import React from 'react';
import useRouter from '../hooks/useRouter';

export interface RootProps {}

function Root(props: RootProps) {
  const {} = props;
  const { push } = useRouter();

  return (
    <>
      <p>Root</p>
      <button onClick={() => push('/about')}>about</button>
    </>
  );
}

export default Root;
