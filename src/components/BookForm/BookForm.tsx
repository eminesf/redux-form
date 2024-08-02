import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid4 } from "uuid";
import {
  addBook,
  addBookOptimistic,
  updateBook,
  updateBookOptimistic,
} from "../../redux/slices/booksSlice";
import { useState } from "react";

import styles from "./BookForm.module.scss";
import { useAppDispatch } from "../../redux/hooks";

interface BookFormProps {
  bookId?: string;
  titleValue?: string;
  authorValue?: string;
}

const bookFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "You must enter the title's book",
    })
    .toLowerCase()
    .transform((title) => {
      return title
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  author: z
    .string()
    .min(1, {
      message: "You must enter the author's name",
    })
    .toLowerCase()
    .transform((author) => {
      return author
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
});

type CreateBookFormData = z.infer<typeof bookFormSchema>;

const BookForm: React.FC<BookFormProps> = ({
  bookId,
  titleValue,
  authorValue,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateBookFormData>({
    resolver: zodResolver(bookFormSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newTitleValue, setNewTitleValue] = useState(titleValue);
  const [newAuthorValue, setNewAuthorValue] = useState(authorValue);

  const onSubmit = async (data: CreateBookFormData) => {
    if (bookId) {
      const book = {
        id: bookId,
        ...data,
      };
      dispatch(updateBook(book));
      await dispatch(updateBookOptimistic(book));
      navigate("/");
      return;
    }

    const book = {
      id: uuid4(),
      ...data,
    };
    dispatch(addBook(book));
    await dispatch(addBookOptimistic(book));
    navigate("/");
  };

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container_input}>
        <div className={styles.input_body}>
          <label data-testid="title-label" htmlFor="title">
            Title
          </label>
          <input
            data-testid="title-input"
            value={newTitleValue}
            type="text"
            {...register("title")}
            onChange={(ev) => setNewTitleValue(ev.target.value)}
          />
          {errors.title && (
            <span className={styles.error_message}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.input_body}>
          <label data-testid="author-label" htmlFor="author">
            Author
          </label>
          <input
            data-testid="author-input"
            value={newAuthorValue}
            type="text"
            {...register("author")}
            onChange={(ev) => setNewAuthorValue(ev.target.value)}
          />
          {errors.author && (
            <span className={styles.error_message}>
              {errors.author.message}
            </span>
          )}
        </div>

        <div className={styles.buttons_container}>
          <button type="submit">Save</button>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      </div>
    </form>
  );
};

export default BookForm;
