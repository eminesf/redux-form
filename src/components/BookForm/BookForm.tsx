import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  addBook,
  addBookOptimistic,
  updateBook,
  updateBookOptimistic,
} from "../../redux/slices/booksSlice";
import { useState } from "react";

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
  const dispatch = useDispatch<AppDispatch>();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
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
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
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
          {errors.author && <span>{errors.author.message}</span>}
        </div>

        <button onClick={() => navigate("/")}>Back</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default BookForm;
