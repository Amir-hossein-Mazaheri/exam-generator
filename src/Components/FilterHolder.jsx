import { useState } from "react";
import Filters from "./Filters";

function FilterHolder() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="rounded-md px-7 py-2 bg-violet-500 text-white mb-5 relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-center text-base text-semibold text-white">
          فیلتر
        </h2>
      </div>
      {isCollapsed && <Filters />}
    </div>
  );
}

export default FilterHolder;
