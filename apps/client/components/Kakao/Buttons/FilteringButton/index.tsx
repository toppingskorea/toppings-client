import { useTheme } from "@emotion/react";
import { Filtering } from "@svgs/map";
import { Exit } from "@svgs/recent";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { useButtonClick, useKeywordBox } from "./FilteringButton.hooks";
import { Button, Container, KeywordBox } from "./FilteringButton.styles";

export const FilteringButton = () => {
  const { colors } = useTheme();
  const { currentSelectKeyword, removeStatesHandler } = useKeywordBox();
  const { pushByLoggedInHandler } = useButtonClick();

  return (
    <Container>
      {currentSelectKeyword && (
        <KeywordBox>
          <Text _fontSize={17} _color={colors.white}>
            {currentSelectKeyword}
          </Text>
          <Exit onClick={removeStatesHandler} />
        </KeywordBox>
      )}

      <Button
        type="button"
        variants={defaultScaleChangeVariants}
        onClick={pushByLoggedInHandler}
        {...framerMocker}
      >
        <Filtering />
      </Button>
    </Container>
  );
};
