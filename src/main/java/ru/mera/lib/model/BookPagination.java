package ru.mera.lib.model;

import ru.mera.lib.entity.Book;

import java.util.List;

public class BookPagination {

    private List<Book> books;
    private int pageCount;
    private int totalItems;

    public BookPagination(List<Book> books, int pageCount, int totalItems) {
        this.books = books;
        this.pageCount = pageCount;
        this.totalItems = totalItems;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }
}
