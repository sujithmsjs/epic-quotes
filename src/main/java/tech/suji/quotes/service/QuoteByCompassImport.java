package tech.suji.quotes.service;

import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.stereotype.Service;

@Service
public class QuoteByCompassImport {
	
	@Autowired
	private MongoTemplate mongoTemplate;

	public void get() {
		
		List<Document> pipeline = Arrays.asList(new Document("$unwind", 
			    new Document("path", "$tags")), 
			    new Document("$group", 
			    new Document("_id", "$tags")
			            .append("count", 
			    new Document("$sum", 1L))), 
			    new Document("$sort", 
			    new Document("_id", 1L)));
		
		
		
		//List<Document> result = mongoTemplate.aggregate(pipeline, "quotes", Document.class).getMappedResults();
		
        //return result;
		
	}
}
