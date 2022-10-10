export interface TagProps {
  children: string;
}

function Tag(props: TagProps) {
  const { children } = props;

  return (
    <>
      <div>{children}</div>

      <style jsx>{`
        div {
          padding: 0 16px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          color: #128886;
          border-radius: 50px;
        }
      `}</style>
    </>
  );
}

export default Tag;
