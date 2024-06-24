/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchBooks } from "../redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "./HomePage.module.scss";
import { booksSliceSelector } from "../redux/slices/booksSlice.selectors";
import BookList from "../components/BookList/BookList";
import { Loading } from "../components/Loading/Loading";
import { ErrorComponent } from "../components/ErrorComponent/ErrorComponent";
import { useNavigate } from "react-router-dom";

// style this page the way you want
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, books } = useAppSelector(booksSliceSelector);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchBooks(abortController.signal));
    return () => abortController.abort();
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;

  const filteredBooks = books.filter((book) => {
    const titleFiltered = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const authorFiltered = book.author
      .toLowerCase()
      .includes(search.toLowerCase());

    if (titleFiltered) {
      return titleFiltered;
    } else {
      return authorFiltered;
    }
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search</h1>
      <input
        type="text"
        placeholder="Search books..."
        data-testid="search-input"
        className=""
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />

      <div>
        <h1>Books</h1>
        <BookList books={filteredBooks} />
      </div>
      <div>
        <button data-testid="add-button" onClick={() => navigate("./add")}>
          Add new book
        </button>
      </div>
    </div>
  );
};

export default HomePage;
