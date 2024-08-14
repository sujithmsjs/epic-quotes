package tech.suji.quotes.repos;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import tech.suji.quotes.dto.QuoteType;
import tech.suji.quotes.entity.Quote;


public interface QuoteRepository extends MongoRepository<Quote, Long> {

	@Query(value = "{type : ?0 , category : ?1}")
	public List<Quote> findByTypeAndCat(QuoteType type, String category);

	@Query(value = "{ employee_name: { $regex: /?0/i } } ", fields = "{ '_id' : 0 ,employee_name : 1}")
	List<Quote> findAgentsByUserId(String employeeName);
}
