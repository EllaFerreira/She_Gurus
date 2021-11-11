import React from "react";
import { Loader } from "rsuite";

const instance = function () {
  return (
    <div>
      <Loader size="lg" content="Large" />
    </div>
  );
};
export default ReactDOM.render(instance);
