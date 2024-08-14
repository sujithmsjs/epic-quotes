package tech.suji.quotes.repos;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import tech.suji.quotes.entity.Book;


public interface BookRepository extends MongoRepository<Book, Long> {

    boolean existsByTitleIgnoreCase(String title);
    Optional<Book> findByAuthor(String author);
    Optional<Book> findByTitle(String title);

}
