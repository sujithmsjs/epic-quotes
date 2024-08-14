package tech.suji.quotes.util;

import org.bson.Document;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperationContext;

import lombok.extern.slf4j.Slf4j;

/**
 * @author sujith.manchala
 * 
 */

@Slf4j
public class CustomAggregationOperation implements AggregationOperation {

  private String jsonOperation;

  public CustomAggregationOperation(String jsonOperation) {
    this.jsonOperation = jsonOperation;
  }

  @Override
  public org.bson.Document toDocument(AggregationOperationContext aggregationOperationContext) {
	  Document document = aggregationOperationContext.getMappedObject(org.bson.Document.parse(jsonOperation));
	 log.info("CustomAggregationOperation query: "+document);
    return document;
  }
}