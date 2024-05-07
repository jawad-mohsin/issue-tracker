import Spinner from "@/app/components/Spinner";
import React from "react";

const loading = () => {
  return (
    <div className="p-5 flex justify-center items-center mt-32">
      <Spinner />
    </div>
  );
};

export default loading;
