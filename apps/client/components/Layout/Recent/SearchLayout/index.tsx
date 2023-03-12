import { Container } from "./SearchLayout.styles";

interface Props {
  children: JSX.Element;
}

const SearchLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default SearchLayout;
