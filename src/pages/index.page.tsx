import { Flex, Stack } from "@toss/emotion-utils";
import { Colors, Text } from "~/constants";

const Index = () => (
  <Stack.Vertical gutter={32}>
    <Text _fontSize={36} _color={Colors.white}>
      I&apos;m toppings
    </Text>
    <Text _fontSize={24} _color={Colors.white}>
      I&apos;m toppings
    </Text>
    <Text _fontSize={18} _color={Colors.white}>
      I&apos;m toppings
    </Text>
    <Stack.Horizontal align="center">
      <Text _fontSize={36} _color={Colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={24} _color={Colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={18} _color={Colors.white}>
        I&apos;m toppings
      </Text>
    </Stack.Horizontal>
    <Flex.Center direction="column">
      <Text _fontSize={36} _color={Colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={24} _color={Colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={18} _color={Colors.white}>
        I&apos;m toppings
      </Text>
    </Flex.Center>
    <Stack.Vertical gutter={500}>
      <Text _fontSize={36} _color={Colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={24} _color={Colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={18} _color={Colors.white}>
        I&apos;m toppings
      </Text>
    </Stack.Vertical>
  </Stack.Vertical>
);

export default Index;
