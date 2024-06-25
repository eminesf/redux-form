/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addBook, addBookOptimistic } from "../../redux/slices/booksSlice";
import { useEffect } from "react";

interface BookFormProps {
  bookId?: string;
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

const BookForm: React.FC<BookFormProps> = ({ bookId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateBookFormData>({
    resolver: zodResolver(bookFormSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: CreateBookFormData) => {
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
          <label htmlFor="title">Book's title:</label>
          <input type="text" {...register("title")} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="author">Author Name:</label>
          <input type="text" {...register("author")} />
          {errors.author && <span>{errors.author.message}</span>}
        </div>

        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default BookForm;
