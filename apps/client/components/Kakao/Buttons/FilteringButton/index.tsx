import { useCurrentSelectKeywordValue } from "@atoms/recent";
import { useTheme } from "@emotion/react";
import { Filtering } from "@svgs/map";
import { Exit } from "@svgs/recent";
import { del } from "idb-keyval";
import { Text } from "~/components/Common/Typo";
import {
  defaultScaleChangeVariants,
  framerMocker,
  indexedDBKeys
} from "~/constants";
import { useInternalRouter, useResetRecentRecoilState } from "~/hooks";
import { isLoggedIn } from "~/utils";
import { Button, Container, KeywordBox } from "./FilteringButton.styles";

export const FilteringButton = () => {
  const { push } = useInternalRouter();
  const { colors } = useTheme();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const { executeResetAll } = useResetRecentRecoilState();

  return (
    <Container>
      {currentSelectKeyword && (
        <KeywordBox>
          <Text _fontSize={17} _color={colors.white}>
            {currentSelectKeyword}
          </Text>
          <Exit
            onClick={() => {
              del(indexedDBKeys.currentSelectKeyword);
              del(indexedDBKeys.currentSelectCategory);
              executeResetAll();
            }}
          />
        </KeywordBox>
      )}

      <Button
        type="button"
        variants={defaultScaleChangeVariants}
        onClick={() =>
          push(isLoggedIn() ? "/recent" : "/recent/filter/restaurant")
        }
        {...framerMocker}
      >
        <Filtering />
      </Button>
    </Container>
  );
};
