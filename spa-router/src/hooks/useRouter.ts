export interface IUseRouter {
  push: (url: string) => void;
}

export default function useRouter(): IUseRouter {
  const push = (url: string) => {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return {
    push,
  };
}
