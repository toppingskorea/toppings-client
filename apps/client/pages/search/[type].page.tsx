import type { GetServerSideProps } from "next";
import { SearchPage } from "~/components/Search";
import type { SearchType } from "~/components/Search/SearchPage";

export const getServerSideProps: GetServerSideProps<{
  type: SearchType;
}> = async context => ({
  props: {
    type: context.query.type as SearchType
  }
});

export default SearchPage;
