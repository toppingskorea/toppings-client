import { useTheme } from "@emotion/react";
import { useInternalRouter } from "~/hooks";
import navList from "./BottomNavigator.constants";
import { useIconButtonClick, useRenderIcon } from "./BottomNavigator.hooks";
import { Container, IconButton, ListContainer } from "./BottomNavigator.styles";

const BottomNavigator = () => {
  const { colors } = useTheme();
  const { asPath } = useInternalRouter();

  const { renderIcon } = useRenderIcon();

  const { onClickIconButtonHandler } = useIconButtonClick();

  return (
    <Container>
      <ListContainer>
        {navList.map(({ icon, href, activatedIcon }) => (
          <IconButton
            key={href}
            type="button"
            onClick={onClickIconButtonHandler(href)}
            fill={colors.secondary[href === asPath ? "6D" : "D9"]}
          >
            {renderIcon(icon, activatedIcon, href)}
          </IconButton>
        ))}
      </ListContainer>
    </Container>
  );
};

export default BottomNavigator;
