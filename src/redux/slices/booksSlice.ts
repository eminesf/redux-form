import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../../types/book";

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: true,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (signal: AbortSignal) => {
    try {
      const response = await axios.get<Book[]>("http://localhost:3001/books", {
        signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return [];
      }
      throw error;
    }
  }
);

export const addBookOptimistic = createAsyncThunk(
  "books/addBookOptimistic",
  async (data: Book) => {
    try {
      const response = await axios.post(`http://localhost:3001/books`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

// This function is intended to optimistically update a book in the store
export const updateBookOptimistic = createAsyncThunk(
  "books/updateBookOptimistic",
  async (data: Book) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/books/${data.id}`,
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const deleteBookOptimistic = createAsyncThunk(
  "books/deleteBookOptimistic",
  async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      return response.statusText;
    } catch (error) {
      return console.log(error);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      state.books.map((book) => {
        if (book.id == action.payload.id) {
          book.title = action.payload.title;
          book.author = action.payload.author;
        }
      });
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch books";
      })
      .addCase(addBookOptimistic.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to add book";
      })
      .addCase(updateBookOptimistic.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update book";
      })
      .addCase(deleteBookOptimistic.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete book";
      });
  },
});

export const { addBook, updateBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;
