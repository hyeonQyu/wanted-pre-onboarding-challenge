export interface LoadingProps {
  size: number;
}

function Loading(props: LoadingProps) {
  const { size } = props;
  const centerSize = (size / 100) * 60;

  return (
    <>
      <div className={'loading'}>
        <div className={'center'} />
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        .loading {
          width: ${size}px;
          height: ${size}px;
          background: conic-gradient(#38e9c2 0 60%, #cdf8ed 80% 60%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spin 0.6s infinite;
        }

        .center {
          width: ${centerSize}px;
          height: ${centerSize}px;
          border-radius: 50%;
          background-color: white;
        }
      `}</style>
    </>
  );
}

export default Loading;
