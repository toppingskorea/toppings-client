const router = {
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  prefetch: () => {},
  push: function (pathname) {
    this.pathname = pathname;
  },
};

export const useRouter = () => router;

export default { useRouter };
