package tech.suji.quotes.practice;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SkipOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import tech.suji.quotes.dto.SearchQuote;
import tech.suji.quotes.util.CustomAggregationOperation;

@Service
public class QuoteAggrService {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private QuoteAggrRepository aggrRepository;

	public static final String COUNT = "count";
	public static final String QUOTES = "quotes";

	public List<IQuote> findIQuote() {
		return aggrRepository.findIQuote();
	}

	public List<IQuote> findIQuoteSorted(SearchQuote searchQuote) {
		String aggregationQuery = """
				{
				    $unwind:
				      {
				        path: '$tags',
				        preserveNullAndEmptyArrays: true,
				      },
				}
				""";

		var pageNumber = 0L;
		var pageSize = 10L;
		Optional<Criteria> optncriteria = createCriteria(searchQuote);

		var aggrList = new ArrayList<AggregationOperation>();

		if (optncriteria.isPresent()) {
			MatchOperation matchStage = Aggregation.match(optncriteria.get());
			aggrList.add(matchStage);
		}

		AggregationOperation unwindStage = Aggregation.stage(aggregationQuery);
		aggrList.add(unwindStage);
		// Define the aggregation pipeline stage to count the documents after the
		// $unwind stage
		AggregationOperation countStage = Aggregation.group().count().as(COUNT);
		aggrList.add(countStage);

		Aggregation queryAggregation = Aggregation.newAggregation(aggrList);

		// Count total Elements
		AggregationResults<Document> results = mongoTemplate.aggregate(queryAggregation, QUOTES, Document.class);
		results.getUniqueMappedResult().getInteger(COUNT);

		System.out.println("Results: " + results.getUniqueMappedResult().getInteger(COUNT));
		aggrList.remove(aggrList.size() - 1);

		SkipOperation skipStage = Aggregation.skip(pageNumber * pageSize);
		aggrList.add(skipStage);

		LimitOperation limitStage = Aggregation.limit(pageSize);
		aggrList.add(limitStage);

		Aggregation aggregation = Aggregation.newAggregation(aggrList);

		AggregationResults<IQuote> aggregate = mongoTemplate.aggregate(aggregation, QUOTES, IQuote.class);

		return aggregate.getMappedResults();
	}
	
	public List<IQuote> findIQuoteSortedV1(SearchQuote searchQuote) {
		String aggregationQuery = """
				{
				    $unwind:
				      {
				        path: '$tags',
				        preserveNullAndEmptyArrays: true,
				      },
				}
				""";

		var pageNumber = 0L;
		var pageSize = 10L;
		Optional<Criteria> optncriteria = createCriteria(searchQuote);

		var aggrList = new ArrayList<AggregationOperation>();

		if (optncriteria.isPresent()) {
			MatchOperation matchStage = Aggregation.match(optncriteria.get());
			aggrList.add(matchStage);
		}

		//AggregationOperation unwindStage = Aggregation.stage(aggregationQuery);
		var unwindStage = new CustomAggregationOperation(aggregationQuery);
		
		aggrList.add(unwindStage);
		// Define the aggregation pipeline stage to count the documents after the
		// $unwind stage
		AggregationOperation countStage = Aggregation.group().count().as(COUNT);
		aggrList.add(countStage);

		Aggregation queryAggregation = Aggregation.newAggregation(aggrList);

		// Count total Elements
		AggregationResults<Document> results = mongoTemplate.aggregate(queryAggregation, QUOTES, Document.class);
		results.getUniqueMappedResult().getInteger(COUNT);

		System.out.println("Results: " + results.getUniqueMappedResult().getInteger(COUNT));
		aggrList.remove(aggrList.size() - 1);

		SkipOperation skipStage = Aggregation.skip(pageNumber * pageSize);
		aggrList.add(skipStage);

		LimitOperation limitStage = Aggregation.limit(pageSize);
		aggrList.add(limitStage);

		Aggregation aggregation = Aggregation.newAggregation(aggrList);

		AggregationResults<IQuote> aggregate = mongoTemplate.aggregate(aggregation, QUOTES, IQuote.class);

		return aggregate.getMappedResults();
	}

	public Optional<Criteria> createCriteria(SearchQuote searchQuote) {

		List<Criteria> criteriaList = new ArrayList<>();

		if (searchQuote.getQuote() != null && !searchQuote.getQuote().isEmpty()) {
			criteriaList.add(Criteria.where("quote").regex(searchQuote.getQuote(), "i"));
		}

		if (searchQuote.getAuthor() != null && !searchQuote.getAuthor().isEmpty()) {
			criteriaList.add(Criteria.where("author").regex(searchQuote.getAuthor(), "i"));
		}

		if (searchQuote.getCategory() != null && !searchQuote.getCategory().isEmpty()) {
			criteriaList.add(Criteria.where("category").is(searchQuote.getCategory()));
		}

		if (searchQuote.getType() != null) {
			criteriaList.add(Criteria.where("type").is(searchQuote.getType()));
		}

		if (searchQuote.getTags() != null && !searchQuote.getTags().isEmpty()) {
			criteriaList.add(Criteria.where("tags").all(searchQuote.getTags()));
		}

		if (searchQuote.getBook() != null && !searchQuote.getBook().isEmpty()) {
			criteriaList.add(Criteria.where("book").regex(searchQuote.getBook(), "i"));
		}

		if (searchQuote.getChapter() != null) {
			criteriaList.add(Criteria.where("chapter").is(searchQuote.getChapter()));
		}

		if (criteriaList.isEmpty()) {
			return Optional.ofNullable(null);
		}

		if (criteriaList.size() == 1) {
			return Optional.ofNullable(criteriaList.get(0));
		}

		Criteria combinedCriteria = new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));

		return Optional.ofNullable(combinedCriteria);
	}

	

}
