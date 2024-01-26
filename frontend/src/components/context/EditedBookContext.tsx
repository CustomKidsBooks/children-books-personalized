import { createContext, useContext, ReactNode, useState } from "react";

interface BookContentValues {
  id: number;
  image: string;
  paragraph: string | undefined;
}

interface BookContextType {
  editedBook: BookContentValues[];
  updateEditedBookContent: (newBookContent: BookContentValues[]) => void;
  editedImages: string[];
  updateEditedImages: (newEditedImages: string[]) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

interface BookProviderProps {
  children: ReactNode;
}

export const useEditedBookContext = (): BookContextType => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};

export const EditedBookProvider: React.FC<BookProviderProps> = ({
  children,
}) => {
  const [editedBook, setEditedBook] = useState<BookContentValues[]>([]);
  const [editedImages, setEditedImages] = useState<string[]>([]);
  const updateEditedBookContent = (newBookContent: BookContentValues[]) => {
    setEditedBook(newBookContent);
  };

  const updateEditedImages = (newEditedImages: string[]) => {
    setEditedImages(newEditedImages);
  };

  return (
    <BookContext.Provider
      value={{
        editedBook,
        updateEditedBookContent,
        editedImages,
        updateEditedImages,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
