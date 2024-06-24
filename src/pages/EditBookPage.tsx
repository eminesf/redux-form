import React from "react";

import styles from "./EditBookPage.module.scss";

// style this page the way you want
const EditBookPage: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Edit Book</h1>
    {/* <BookForm bookId={id} /> */}
  </div>
);

export default EditBookPage;
