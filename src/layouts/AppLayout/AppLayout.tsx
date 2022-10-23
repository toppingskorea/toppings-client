import Container from "./AppLayout.styles";
import AppLayoutProps from "./AppLayout.types";

const AppLayout = ({ children }: AppLayoutProps) => (
  <Container>{children}</Container>
);
export default AppLayout;
