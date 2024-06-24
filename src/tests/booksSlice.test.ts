import { describe, it, expect } from "vitest";
import booksReducer, {
  addBook,
  updateBook,
  deleteBook,
} from "../redux/slices/booksSlice";
import { Book } from "../types/book";

describe("books reducer", () => {
  const initialState = {
    books: [] as Book[],
    loading: false,
    error: null,
  };

  it("should handle addBook", () => {
    const book: Book = {
      id: "1b915490-baaa-4ba4-9e00-cd72c3f1c4c5",
      title: "Book 1",
      author: "Author 1",
    };
    const state = booksReducer(initialState, addBook(book));
    expect(state.books).toContainEqual(book);
  });

  it("should handle updateBook", () => {
    const initialBook: Book = {
      id: "1b915490-baaa-4ba4-9e00-cd72c3f1c4c5",
      title: "Book 1",
      author: "Author 1",
    };
    const updatedBook: Book = {
      id: "1b915490-baaa-4ba4-9e00-cd72c3f1c4c5",
      title: "Updated Book 1",
      author: "Updated Author 1",
    };
    const stateWithBook = booksReducer(initialState, addBook(initialBook));
    const state = booksReducer(stateWithBook, updateBook(updatedBook));
    expect(state.books).toContainEqual(updatedBook);
  });

  it("should handle deleteBook", () => {
    const book1: Book = {
      id: "1b915490-baaa-4ba4-9e00-cd72c3f1c4c5",
      title: "Book 1",
      author: "Author 1",
    };
    const book2: Book = {
      id: "31a37771-ad9a-48e3-a109-e15e44ca7e16",
      title: "Book 2",
      author: "Author 2",
    };
    const stateWithBooks = booksReducer(
      {
        ...initialState,
        books: [book1, book2],
      },
      { type: "" }
    );
    const state = booksReducer(stateWithBooks, deleteBook(book1.id));
    expect(state.books).not.toContainEqual(book1);
  });
});
