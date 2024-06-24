import { useState } from "react";
import { Book } from "../types/book";

export const usePagination = (data: Array<Book>, itensPerPage: number) => {
  const [actualPage, setActualPage] = useState(1);
  const totalPages = Math.ceil(data.length / itensPerPage);

  const handleBackPage = () => {
    setActualPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    setActualPage((prevState) => prevState + 1);
  };

  const getItemsPage = () => {
    const firstIndex = (actualPage - 1) * itensPerPage;
    const lastIndex = actualPage * itensPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  return {
    actualPage,
    totalPages,
    handleBackPage,
    handleNextPage,
    getItemsPage,
  };
};
