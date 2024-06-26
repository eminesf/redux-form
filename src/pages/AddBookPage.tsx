import React from "react";
import BookForm from "../components/BookForm/BookForm";

import styles from "./AddBookPage.module.scss";

// style this page the way you want
const AddBookPage: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Add new Book</h1>
    <BookForm />
  </div>
);

export default AddBookPage;
