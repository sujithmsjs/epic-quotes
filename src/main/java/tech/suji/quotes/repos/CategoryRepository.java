package tech.suji.quotes.repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import tech.suji.quotes.entity.Category;


public interface CategoryRepository extends MongoRepository<Category, Long> {

    boolean existsByNameIgnoreCase(String name);

}
