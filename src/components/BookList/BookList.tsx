import React, { useState } from "react";

import { Book } from "../../types/book";
import {
  deleteBook,
  deleteBookOptimistic,
} from "../../redux/slices/booksSlice";
import { usePagination } from "../../hooks/usePagination";
import { Pencil, Trash2 } from "lucide-react";

import { Modal } from "../Modal/Modal";
import styles from "./BookList.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [openModal, setOpenModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState({ id: "", title: "" });
  const dispatch = useAppDispatch();
  const {
    actualPage,
    getItemsPage,
    handleBackPage,
    handleNextPage,
    totalPages,
  } = usePagination(books, 5);
  const navigate = useNavigate();

  const { title } = bookToDelete;

  const confirmDelete = () => {
    const { id, title } = bookToDelete;
    dispatch(deleteBookOptimistic(id));
    dispatch(deleteBook(id));
    setOpenModal(!openModal);
    alert(`Book ${title} is deleted`);
  };

  const handleDelete = (id: string, title: string) => {
    const toDelete = {
      id: id,
      title: title,
    };
    setBookToDelete(toDelete);
    setOpenModal(!openModal);
  };

  const handleUpdate = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={styles.content}>
      <div>
        <ul>
          {getItemsPage().map((book) => {
            return (
              <li key={book.id}>
                <div className={styles.book_item}>
                  <div>
                    <p>Title: {book.title}</p>
                    <p>Author: {book.author}</p>
                  </div>
                  <div className={styles.edit_delete_container}>
                    <button
                      data-testid="edit-button"
                      className={styles.button_edit}
                      onClick={() => handleUpdate(book.id)}
                    >
                      <Pencil />
                    </button>
                    <button
                      data-testid="delete-button"
                      className={styles.button_delete}
                      onClick={() => handleDelete(book.id, book.title)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Modal isOpen={openModal}>
        <div>
          <p>
            Are you sure you want to delete the{" "}
            <span className={styles.title_book_modal}>"{title}"</span> book?{" "}
          </p>
        </div>
        <div className={styles.modal_button_container}>
          <button
            className={styles.modal_yes_button}
            data-testid="confirm-delete-button"
            onClick={() => confirmDelete()}
          >
            Yes
          </button>
          <button onClick={() => setOpenModal(false)}>No</button>
        </div>
      </Modal>

      <section className={styles.pagination}>
        <button
          type="button"
          onClick={handleBackPage}
          disabled={actualPage === 1}
        >
          Back
        </button>
        <p>
          PAGE {actualPage} OF {totalPages || "1"}
        </p>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={actualPage === totalPages}
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default BookList;
