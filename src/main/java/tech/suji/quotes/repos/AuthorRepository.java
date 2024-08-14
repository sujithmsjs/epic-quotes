package tech.suji.quotes.repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import tech.suji.quotes.entity.Author;


public interface AuthorRepository extends MongoRepository<Author, Long> {

    boolean existsByNameIgnoreCase(String name);
    Author findByName(String name);

}
