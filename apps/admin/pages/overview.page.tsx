import React from "react";
import { useSetHeader } from "~/hooks";

const Overview = () => {
  useSetHeader("Overview");
  return <div>overview</div>;
};

export default Overview;
