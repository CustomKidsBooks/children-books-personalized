import { Button } from "@ui/Button";

const SendBook = () => {
  return (
    <div className="items-center">
      <h1 className="text-2xl font-bold font-quicksand tracking-widest">
        Send by email:
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

export default SendBook;
