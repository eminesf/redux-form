import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RootState } from "../redux/store";
import BookForm from "../components/BookForm/BookForm";
import booksReducer from "../redux/slices/booksSlice";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { Mocked, vi } from "vitest";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("BookForm", () => {
  let store: EnhancedStore<unknown, UnknownAction>;
  let book: RootState["books"]["books"][0];

  beforeEach(() => {
    book = {
      id: "31a37771-ad9a-48e3-a109-e15e44ca7e16",
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
    };
    store = configureStore({
      reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: { books: [book], loading: false, error: null },
      },
    });
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookForm />
        </BrowserRouter>
      </Provider>
    );

    // TODO: change getByLabelText to match the actual interface
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Author")).toBeInTheDocument();
  });

  it("populates form fields when a book is provided", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookForm bookId={book.id} />
        </BrowserRouter>
      </Provider>
    );

    // TODO: change getByLabelText to match the actual interface
    expect(screen.getByLabelText("Title")).toHaveValue(book.title);
    expect(screen.getByLabelText("Author")).toHaveValue(book.author);
  });

  it("submits correctly when a new book is added", async () => {
    const newBook = {
      id: "31a37771-ad9a-48e3-a109-e15e44ca7e16",
      title: "New Book",
      author: "New Author",
    };
    mockedAxios.post.mockResolvedValue({ data: newBook });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookForm />
        </BrowserRouter>
      </Provider>
    );

    // TODO: change getByLabelText, findByDisplayValue to match the actual interface
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: newBook.title },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: newBook.author },
    });
    // TODO: change getByRole to match the actual interface
    fireEvent.click(screen.getByRole("button"));

    await screen.findByDisplayValue(newBook.title);

    const { books } = store.getState() as RootState;

    expect(books.books).toContainEqual(
      expect.objectContaining({
        title: newBook.title,
        author: newBook.author,
        id: expect.any(String),
      })
    );

    expect(books.error).toBeNull();
  });

  it("submits correctly when an existing book is updated", async () => {
    const updatedBook = {
      ...book,
      title: "Updated Title",
      author: "Updated Author",
    };

    mockedAxios.put.mockResolvedValue({ data: updatedBook });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookForm bookId={book.id} />
        </BrowserRouter>
      </Provider>
    );

    // TODO: change getByLabelText, getByText, findByDisplayValue to match the actual interface
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: updatedBook.title },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: updatedBook.author },
    });
    // TODO: change getByRole to match the actual interface
    fireEvent.click(screen.getByRole("button"));

    await screen.findByDisplayValue(updatedBook.title);

    const { books } = store.getState() as RootState;

    expect(books.books).toContainEqual(updatedBook);

    expect(books.error).toBeNull();
  });
});
