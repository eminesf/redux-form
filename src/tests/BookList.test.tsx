import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import booksReducer from "../redux/slices/booksSlice";
import BookList from "../components/BookList/BookList";
import { RootState } from "../redux/store";

describe("BookList", () => {
  let store: EnhancedStore<unknown, UnknownAction>;
  let books: RootState["books"]["books"];

  beforeEach(() => {
    books = [
      {
        id: "1",
        title: "Book 1",
        author: "Author 1",
      },
      {
        id: "2",
        title: "Book 2",
        author: "Author 2",
      },
    ];

    store = configureStore({
      reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: { books, loading: false, error: null },
      },
    });
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BookList books={books} />
        </BrowserRouter>
      </Provider>
    );

    expect(
      getByText((content) => content.includes(books[0].title))
    ).toBeInTheDocument();
    expect(
      getByText((content) => content.includes(books[1].title))
    ).toBeInTheDocument();
  });

  it("renders the correct number of books", () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BookList books={books} />
        </BrowserRouter>
      </Provider>
    );

    expect(getAllByRole("listitem").length).toBe(2);
  });

  it("delete button dispatches the correct action", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookList books={books} />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = await screen.findAllByTestId("delete-button");
    fireEvent.click(deleteButton[0]);

    const confirmDeleteButton = await screen.findAllByTestId(
      "confirm-delete-button"
    );
    fireEvent.click(confirmDeleteButton[0]);

    const state = store.getState() as RootState;

    expect(state.books.books).not.toContainEqual(books[0]);

    expect(state.books.error).toBeNull();
  });
});
