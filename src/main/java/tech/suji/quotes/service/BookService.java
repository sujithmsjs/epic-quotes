package tech.suji.quotes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import tech.suji.quotes.dto.BookDTO;
import tech.suji.quotes.entity.Author;
import tech.suji.quotes.entity.Book;
import tech.suji.quotes.repos.AuthorRepository;
import tech.suji.quotes.repos.BookRepository;
import tech.suji.quotes.util.NotFoundException;

@Slf4j
@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private AuthorRepository authorRepository;

	public List<BookDTO> findAll() {
		final List<Book> books = bookRepository.findAll(Sort.by("id"));
		return books.stream().map(book -> mapToDTO(book, new BookDTO())).toList();
	}

	public BookDTO get(final Long id) {
		return bookRepository.findById(id).map(book -> mapToDTO(book, new BookDTO()))
				.orElseThrow(NotFoundException::new);
	}

	public Long create(final BookDTO bookDTO) {
		final Book book = new Book();

		mapToEntity(bookDTO, book);
		try {
			final Author author = new Author();
			author.setName(bookDTO.getAuthor());
			author.setIsBibleAuthor(bookDTO.getIsBibleBook());
			authorRepository.save(null);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return bookRepository.save(null).getId();
	}

	public void update(final Long id, final BookDTO bookDTO) {
		final Book book = bookRepository.findById(id).orElseThrow(NotFoundException::new);
		mapToEntity(bookDTO, book);
		bookRepository.save(book);
	}

	public void delete(final Long id) {
		bookRepository.deleteById(id);
	}

	private BookDTO mapToDTO(final Book book, final BookDTO bookDTO) {
		bookDTO.setId(book.getId());
		bookDTO.setTitle(book.getTitle());
		bookDTO.setAuthor(book.getAuthor());
		bookDTO.setIsBibleBook(book.getIsBibleBook());
		return bookDTO;
	}

	private Book mapToEntity(final BookDTO bookDTO, final Book book) {
		book.setTitle(bookDTO.getTitle());
		book.setAuthor(bookDTO.getAuthor());
		book.setIsBibleBook(bookDTO.getIsBibleBook());
		return book;
	}

	public boolean titleExists(final String title) {
		return bookRepository.existsByTitleIgnoreCase(title);
	}

}
