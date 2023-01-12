import { Text, VStack } from "@chakra-ui/react";
import { css, useTheme } from "@emotion/react";
import { logo } from "@images/common";
import { Flex, padding, width100 } from "@toss/emotion-utils";
import Image from "next/image";
import InternalLink from "../InternalLink";
import routes from "./Sidebar.constants";

const Sidebar = () => {
  const { dimensions, colors } = useTheme();

  return (
    <VStack
      width={dimensions.sidebarWidth}
      height="100vh"
      borderRight="1px"
      borderRightColor="blackAlpha.100"
    >
      <Flex.Center
        css={css`
          ${width100}
          ${padding({ x: 10, y: 30 })}
          background-color: ${colors.primary};
        `}
      >
        <Image src={logo} alt="toppings" />
      </Flex.Center>

      {routes.map(({ href, label }) => (
        <InternalLink href={href} key={label}>
          <Text>{label}</Text>
        </InternalLink>
      ))}
    </VStack>
  );
};

export default Sidebar;
