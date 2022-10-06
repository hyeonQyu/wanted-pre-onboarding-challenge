import React, { ReactElement, useEffect, useState } from 'react';
import { RouteProps } from './Route';

export interface RouterProps {
  children: ReactElement<RouteProps> | ReactElement<RouteProps>[];
}

function Router(props: RouterProps) {
  const { children } = props;
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    window.onpopstate = () => {
      setPathname(window.location.pathname);
    };
  }, []);

  const childrenProps = (React.Children.toArray(children) as ReactElement<RouteProps>[]).map((child) => child.props);

  const component = (() => {
    const { length } = childrenProps;
    for (let i = 0; i < length; i++) {
      const { path, component } = childrenProps[i];
      if (path === pathname) {
        return component;
      }
    }
    return '404 Error';
  })();

  return <>{component}</>;
}

export default Router;
