import { Button } from "@ui/Button";

const SendBook = () => {
  return (
    <div className="items-center">
      <h1 className="font-bold text text-3xl">Send by email:</h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button intent="secondary" className="text font-bold">
          PDF
        </Button>
        <Button intent="secondary" className="text font-bold">
          Word
        </Button>
      </div>
    </div>
  );
};

export default SendBook;
