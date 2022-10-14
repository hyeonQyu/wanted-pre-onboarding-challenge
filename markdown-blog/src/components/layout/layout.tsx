import { ReactNode } from 'react';
import Link from 'next/link';
import { HEADER_HEIGHT } from '@defines/index';

export interface LayoutProps {
  children: ReactNode | ReactNode[];
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <header>
        <div className={'logo'}>
          <Link href={'/'}>
            <a>
              <h1>hyeonQyu</h1>
            </a>
          </Link>
        </div>
      </header>
      <section>{children}</section>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          background-color: white;
          box-shadow: 0 -4px 17px lightgrey;
          z-index: 100;
          height: ${HEADER_HEIGHT}px;
          box-sizing: border-box;
          padding-bottom: 5px;
        }

        .logo {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .logo,
        section {
          max-width: 1000px;
          margin: 0 auto;
        }

        section {
          height: calc(100% - ${HEADER_HEIGHT + HEADER_HEIGHT / 2}px);
        }

        h1 {
          cursor: pointer;
          width: fit-content;
          margin: 0;
        }
      `}</style>
    </>
  );
}

export default Layout;
