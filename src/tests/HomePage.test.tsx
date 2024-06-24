import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import booksReducer from "../redux/slices/booksSlice";
import { RootState } from "../redux/store";
import { Mocked, vi } from "vitest";
import axios from "axios";

const BOOKS_PER_PAGE = 5;
vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("HomePage", () => {
  let store: EnhancedStore<unknown, UnknownAction>;
  let books: RootState["books"]["books"];

  beforeEach(() => {
    books = Array(20)
      .fill(null)
      .map((_, index) => ({
        id: `${index + 1}`,
        title: `Book ${index + 1}`,
        author: `Author ${index + 1}`,
      }));

    store = configureStore({
      reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: { books, loading: false, error: null },
      },
    });
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );
    });
  });

  it("renders loading state", async () => {
    store = configureStore({
      reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: { books: [], loading: true, error: null },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    // TODO: change getByText to match the actual interface
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const error = "An error occurred";
    mockedAxios.get.mockRejectedValue(new Error(error));
    store = configureStore({
      reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: { books: [], loading: false, error },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    // TODO: change getByText to match the actual interface
    await waitFor(() => {
      expect(getByText(`Error!`)).toBeInTheDocument();
    });
  });

  it("renders books", async () => {
    mockedAxios.get.mockResolvedValue({ data: books });
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(
        getByText((content) => content.includes(books[0].title))
      ).toBeInTheDocument();
      expect(
        getByText((content) => content.includes(books[1].title))
      ).toBeInTheDocument();
    });
  });

  it("searches books", async () => {
    mockedAxios.get.mockResolvedValue({ data: books });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = await screen.findByTestId("search-input");

    fireEvent.change(searchInput, {
      target: { value: books[0].title },
    });

    await waitFor(() => {
      const matchingElements = screen.queryAllByText((content) =>
        content.includes(books[0].title)
      );

      expect(matchingElements.length).toBeGreaterThan(0);
      expect(
        screen.queryByText((content) => content.includes(books[1].title))
      ).not.toBeInTheDocument();
    });
  });

  it("paginates books", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    const state = store.getState() as RootState;
    await waitFor(() => {
      expect(state.books.books.length).toBe(books.length);
      const matchingElements = screen.queryAllByText(/Book \d+/);
      expect(matchingElements.length).toBe(BOOKS_PER_PAGE);
    });
  });

  it("navigates to add book page", async () => {
    mockedAxios.get.mockResolvedValue({ data: books });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const addButton = await screen.findByTestId("add-button");

    fireEvent.click(addButton);

    expect(window.location.pathname).toBe("/add");
  });
});
