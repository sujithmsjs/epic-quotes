package tech.suji.quotes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.UpdateResult;

import tech.suji.quotes.dto.SearchQuote;
import tech.suji.quotes.entity.Quote;
import tech.suji.quotes.entity.Tag;
import tech.suji.quotes.repos.TagRepository;

@Service
public class QuoteSearchService {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private TagRepository tagRepository;

	public UpdateResult updateQuery(Long id, String tag) {
		Query q = new Query();
		q.addCriteria(Criteria.where("_id").is(id));

		Update u = new Update();
		u.addToSet("tags", tag);

		UpdateResult updateFirst = mongoTemplate.updateFirst(q, u, Quote.class);
		return updateFirst;
	}

	public UpdateResult updateManyRecords(String category, String tag) {
		Query q = new Query();
		q.addCriteria(Criteria.where("category").is(category));

		Update u = new Update();
		u.addToSet("tags", tag);

		UpdateResult updateMulti = mongoTemplate.updateMulti(q, u, Quote.class);
		return updateMulti;
	}

	public UpdateResult addTagToMany(SearchQuote searchQuote, String tag) {
		Query q = getQueryFromSearchData(searchQuote);
		Update u = new Update();
		u.addToSet("tags", tag.toLowerCase());
		UpdateResult updateMulti = mongoTemplate.updateMulti(q, u, Quote.class);

		Optional<Tag> optnTag = tagRepository.findByNameIgnoreCase(tag);
		if (optnTag.isEmpty()) {
			Tag newTag = new Tag();
			newTag.setName(tag);
			tagRepository.save(newTag);
		}

		return updateMulti;
	}

	public List<Quote> findBySearchData(SearchQuote searchQuote) {
		Query query = getQueryFromSearchData(searchQuote);
		return mongoTemplate.find(query, Quote.class);
	}

	public Page<Quote> findWithDynamicCriteria(SearchQuote searchQuote) {

		Query query = getQueryFromSearchData(searchQuote);

		if (searchQuote.getSortOrder() == null) {
			searchQuote.setSortOrder(Direction.DESC);
		}

		if (searchQuote.getSortBy() == null) {
			searchQuote.setSortBy("dateCreated");
		}

		if (searchQuote.getPageNo() == null) {
			searchQuote.setPageNo(0);
		}

		if (searchQuote.getPageSize() == null || searchQuote.getPageSize() < 1) {
			searchQuote.setPageSize(10);
		}

		Pageable pageable = null;

		Sort sort = Sort.by(searchQuote.getSortOrder(), searchQuote.getSortBy());
		pageable = PageRequest.of(searchQuote.getPageNo(), searchQuote.getPageSize(), sort);

		// Count all the records
		long totalCount = mongoTemplate.count(query, Quote.class);

		// Adding Pagination
		query.with(pageable);

		List<Quote> quotes = mongoTemplate.find(query, Quote.class);

		return new PageImpl<>(quotes, pageable, totalCount);
	}

	private Query getQueryFromSearchData(SearchQuote searchQuote) {
		Query query = new Query();

		if (searchQuote.getQuote() != null && !searchQuote.getQuote().isEmpty()) {
			query.addCriteria(Criteria.where("quote").regex(searchQuote.getQuote(), "i"));
		}

		if (searchQuote.getAuthor() != null && !searchQuote.getAuthor().isEmpty()) {
			query.addCriteria(Criteria.where("author").regex(searchQuote.getAuthor(), "i"));
		}

		if (searchQuote.getCategory() != null && !searchQuote.getCategory().isEmpty()) {
			query.addCriteria(Criteria.where("category").is(searchQuote.getCategory()));
		}

		if (searchQuote.getType() != null) {
			query.addCriteria(Criteria.where("type").is(searchQuote.getType()));
		}

		if (searchQuote.getTags() != null && !searchQuote.getTags().isEmpty()) {
			query.addCriteria(Criteria.where("tags").all(searchQuote.getTags()));
		}

		if (searchQuote.getBook() != null && !searchQuote.getBook().isEmpty()) {
			query.addCriteria(Criteria.where("book").regex(searchQuote.getBook(), "i"));
		}

		if (searchQuote.getChapter() != null) {
			query.addCriteria(Criteria.where("chapter").is(searchQuote.getChapter()));
		}
		
		return query;
	}

	public Page<Quote> findWithDynamicCriteriaV3(SearchQuote searchQuote) {
		Query query = new Query();

		if (searchQuote.getQuote() != null && !searchQuote.getQuote().isEmpty()) {

			query.addCriteria(Criteria.where("quote").regex(searchQuote.getQuote(), "i"));
		}

		if (searchQuote.getAuthor() != null && !searchQuote.getAuthor().isEmpty()) {
			if (searchQuote.getAuthor().equalsIgnoreCase("not exists")) {
				query.addCriteria(Criteria.where("author").exists(false));
			} else {
				query.addCriteria(Criteria.where("author").regex(searchQuote.getAuthor(), "i"));
			}
		}

		if (searchQuote.getCategory() != null && !searchQuote.getCategory().isEmpty()) {
			if (searchQuote.getCategory().equalsIgnoreCase("not exists")) {
				query.addCriteria(Criteria.where("category").exists(false));
			} else {
				query.addCriteria(Criteria.where("category").is(searchQuote.getCategory()));
			}
		}

		if (searchQuote.getType() != null) {
			query.addCriteria(Criteria.where("type").is(searchQuote.getType()));
		}

		if (searchQuote.getTags() != null && !searchQuote.getTags().isEmpty()) {
			query.addCriteria(Criteria.where("tags").all(searchQuote.getTags()));
		}

		if (searchQuote.getBook() != null && !searchQuote.getBook().isEmpty()) {
			query.addCriteria(Criteria.where("book").regex(searchQuote.getBook(), "i"));
		}

		if (searchQuote.getChapter() != null) {
			query.addCriteria(Criteria.where("chapter").is(searchQuote.getChapter()));
		}

		

		if (searchQuote.getSortOrder() == null) {
			searchQuote.setSortOrder(Direction.ASC);
		}

		if (searchQuote.getPageNo() == null) {
			searchQuote.setPageNo(0);
		}

		if (searchQuote.getPageSize() == null || searchQuote.getPageSize() < 1) {
			searchQuote.setPageSize(10);
		}

		Pageable pageable = null;

		// Add Sorting
		if (searchQuote.getSortBy() != null) {
			Sort sort = Sort.by(searchQuote.getSortOrder(), searchQuote.getSortBy());
			pageable = PageRequest.of(searchQuote.getPageNo(), searchQuote.getPageSize(), sort);
		} else {
			pageable = PageRequest.of(searchQuote.getPageNo(), searchQuote.getPageSize());
		}

		// Count all the records
		long totalCount = mongoTemplate.count(query, Quote.class);

		// Adding Pagination
		query.with(pageable);

		List<Quote> quotes = mongoTemplate.find(query, Quote.class);

		return new PageImpl<>(quotes, pageable, totalCount);
	}
}
