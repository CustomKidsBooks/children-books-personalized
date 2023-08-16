import React from "react";
import { Heading } from "./ui/Heading";
import { Button } from "./ui/Button";

const DownloadBook = () => {
  return (
    <div className="items-center">
      <h1 className="text-2xl font-bold font-quicksand tracking-widest">
        Download:
      </h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button intent="primary">PDF</Button>
        <Button intent="secondary" className="capitalize">
          Word
        </Button>
      </div>
    </div>
  );
};

export default DownloadBook;
