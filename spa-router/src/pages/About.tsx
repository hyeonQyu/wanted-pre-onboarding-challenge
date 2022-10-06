import React from 'react';
import useRouter from '../hooks/useRouter';

export interface AboutProps {}

function About(props: AboutProps) {
  const {} = props;
  const { push } = useRouter();

  return (
    <>
      <p>About</p>
      <button onClick={() => push('/')}>go main</button>
    </>
  );
}

export default About;
