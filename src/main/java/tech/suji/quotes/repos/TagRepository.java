package tech.suji.quotes.repos;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import tech.suji.quotes.entity.Tag;


public interface TagRepository extends MongoRepository<Tag, Long> {

    boolean existsByNameIgnoreCase(String name);
    
    Optional<Tag> findByNameIgnoreCase(String name);

}
