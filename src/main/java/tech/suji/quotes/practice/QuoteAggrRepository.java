package tech.suji.quotes.practice;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import tech.suji.quotes.entity.Quote;

@Repository
public interface QuoteAggrRepository extends MongoRepository<Quote, Long> {

	@Aggregation(pipeline = { """
			{
			    $unwind:
			      {
			        path: '$tags',
			        preserveNullAndEmptyArrays: true,
			      },
			}
			""",

			"""
					{
						$project:
					       {
					         _class: 0,
					       },
					}
					""" })
	public List<IQuote> findIQuote();

}
