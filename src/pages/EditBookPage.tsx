import React from "react";

import styles from "./EditBookPage.module.scss";
import BookForm from "../components/BookForm/BookForm";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { booksSliceSelector } from "../redux/slices/booksSlice.selectors";

// style this page the way you want
const EditBookPage: React.FC = () => {
  const { id } = useParams();
  const { books } = useAppSelector(booksSliceSelector);

  const filteredBook = books.filter((book) => book.id == id);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Book</h1>
      <BookForm
        bookId={id}
        titleValue={filteredBook[0].title}
        authorValue={filteredBook[0].author}
      />
    </div>
  );
};

export default EditBookPage;
