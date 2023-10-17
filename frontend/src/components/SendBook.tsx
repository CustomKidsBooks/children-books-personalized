import { Button } from "@ui/Button";

const SendBook = ({ bookId }: { bookId: number }) => {
  const sendAsPDF = () => {
    // Include the bookId and recipient's email address in the request
    fetch(`http://localhost:5001/api/sendBookAsPdf/${bookId}`, {
      method: "POST",
      body: JSON.stringify({ bookId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Book sent as PDF via email successfully.");
        } else {
          // Handle error
          console.error("Failed to send the book as PDF via email.");
        }
      })
      .catch((error) => {
        console.error("Error sending the book as PDF via email:", error);
      });
  };
  const sendAsWord = () => {
    // Include the bookId and recipient's email address in the request
    fetch(`http://localhost:5001/api/sendBookAsWord/${bookId}`, {
      method: "POST",
      body: JSON.stringify({ bookId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Book sent as Word via email successfully.");
        } else {
          // Handle error
          console.error("Failed to send the book as Word via email.");
        }
      })
      .catch((error) => {
        console.error("Error sending the book as Word via email:", error);
      });
  };

  return (
    <div className="items-center">
      <h1 className="font-bold text text-2xl lg:text-3xl">Send by email:</h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button onClick={sendAsPDF} intent="secondary" className="text font-bold">
          PDF
        </Button>
        <Button onClick={sendAsWord} intent="secondary" className="text font-bold">
          Word
        </Button>
      </div>
    </div>
  );
};

export default SendBook;
