package tech.suji.quotes.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.stereotype.Service;

import jakarta.validation.Validator;
import tech.suji.quotes.dto.QuoteDTO;
import tech.suji.quotes.dto.QuoteType;
import tech.suji.quotes.dto.TagCatCountSearch;
import tech.suji.quotes.entity.Author;
import tech.suji.quotes.entity.Book;
import tech.suji.quotes.entity.Category;
import tech.suji.quotes.entity.Quote;
import tech.suji.quotes.entity.Tag;
import tech.suji.quotes.repos.AuthorRepository;
import tech.suji.quotes.repos.BookRepository;
import tech.suji.quotes.repos.CategoryRepository;
import tech.suji.quotes.repos.QuoteRepository;
import tech.suji.quotes.repos.TagRepository;
import tech.suji.quotes.util.NotFoundException;

@Service
public class QuoteService {

	@Autowired
	private QuoteRepository quoteRepository;

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private BookService bookService;

	@Autowired
	private AuthorRepository authorRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private Validator validator;

	public List<QuoteDTO> findAll() {
		final List<Quote> quotes = quoteRepository.findAll(Sort.by("id"));
		return quotes.stream().map(quote -> mapToDTO(quote, new QuoteDTO())).toList();
	}

	public QuoteDTO get(final Long id) {
		return quoteRepository.findById(id).map(quote -> mapToDTO(quote, new QuoteDTO()))
				.orElseThrow(NotFoundException::new);
	}

	@Deprecated
	public Long createSimilarQuoteMany(final QuoteDTO quoteDTO) {
		final Quote quote = new Quote();
		Optional<Book> optBook = bookRepository.findByTitle(quoteDTO.getBook());

		if (optBook.isPresent()) {
			Book book = optBook.get();
			quoteDTO.setAuthor(book.getAuthor());
			quoteDTO.setIsBibleQuote(book.getIsBibleBook());
		}

		var similarQuoteList = new ArrayList<Quote>();
		var similarQuoteIdSet = new HashSet<Long>();
		if (quoteDTO.getSimilarQuotes() != null && !quoteDTO.getSimilarQuotes().isEmpty()) {
			Set<Long> similarQuoteSet = quoteDTO.getSimilarQuotes();
			for (Long similarQuoteId : similarQuoteSet) {
				Optional<Quote> optnSimilarQuote = quoteRepository.findById(similarQuoteId);
				if (optnSimilarQuote.isPresent()) {
					Quote similarQuote = optnSimilarQuote.get();
					similarQuoteList.add(similarQuote);
					similarQuoteIdSet.add(similarQuoteId);
				}
			}
		}

		quoteDTO.setSimilarQuotes(similarQuoteIdSet);
		mapToEntity(quoteDTO, quote);

		Long createdQuoteId = quoteRepository.save(quote).getId();

		for (Quote updatableQuote : similarQuoteList) {
			if (updatableQuote.getSimilarQuotes() != null) {
				updatableQuote.setSimilarQuotes(Set.of(createdQuoteId));
			} else {
				updatableQuote.getSimilarQuotes().add(createdQuoteId);
			}
			quoteRepository.save(updatableQuote);
		}

		return createdQuoteId;
	}

	public Long createSimilarQuote(final QuoteDTO quoteDTO) {
		final Quote quote = new Quote();
		System.out.println(quoteDTO);
//		Optional<Book> optBook = bookRepository.findByTitle(quoteDTO.getBook());
//
//		if (optBook.isPresent()) {
//			Book book = optBook.get();
//			quoteDTO.setAuthor(book.getAuthor());
//			quoteDTO.setIsBibleQuote(book.getIsBibleBook());
//		}

		var similarQuoteList = new ArrayList<Quote>();
		var similarQuoteIdSet = new HashSet<Long>();
		if (quoteDTO.getSimilarQuotes() != null && !quoteDTO.getSimilarQuotes().isEmpty()) {
			Set<Long> similarQuoteSet = quoteDTO.getSimilarQuotes();
			for (Long similarQuoteId : similarQuoteSet) {
				Optional<Quote> optnSimilarQuote = quoteRepository.findById(similarQuoteId);
				if (optnSimilarQuote.isPresent()) {
					Quote similarQuote = optnSimilarQuote.get();
					similarQuoteList.add(similarQuote);
					similarQuoteIdSet.add(similarQuoteId);
					quoteDTO.setCategory(similarQuote.getCategory());
				}
			}
		}
		quoteDTO.setType(QuoteType.INDIVIDUAL);
		quoteDTO.setSimilarQuotes(similarQuoteIdSet);

		mapToEntity(quoteDTO, quote);

		Long createdQuoteId = quoteRepository.save(quote).getId();

		for (Quote updatableQuote : similarQuoteList) {
			if (updatableQuote.getSimilarQuotes() == null) {
				updatableQuote.setSimilarQuotes(Set.of(createdQuoteId));
			} else {
				updatableQuote.getSimilarQuotes().add(createdQuoteId);
			}
			quoteRepository.save(updatableQuote);
		}

		return createdQuoteId;
	}

	public Long create(final QuoteDTO quoteDTO) {

		final Quote quote = new Quote();
		Optional<Book> optBook = bookRepository.findByTitle(quoteDTO.getBook());
		if (optBook.isPresent()) {
			Book book = optBook.get();
			quoteDTO.setAuthor(book.getAuthor());
			quoteDTO.setIsBibleQuote(book.getIsBibleBook());
		}

		mapToEntity(quoteDTO, quote);

		// Auto detecting tags
		Set<String> tagSet = tagRepository.findAll().stream().map(tag -> tag.getName()).collect(Collectors.toSet());
		addAutoDetectedTagsToQuote(quote, tagSet);

		return quoteRepository.save(quote).getId();
	}

	public void update(final Long id, final QuoteDTO quoteDTO) {
		final Quote quote = quoteRepository.findById(id).orElseThrow(NotFoundException::new);

		Optional<Book> optBook = bookRepository.findByTitle(quoteDTO.getBook());
		if (optBook.isPresent()) {
			Book book = optBook.get();
			quoteDTO.setAuthor(book.getAuthor());
			quoteDTO.setIsBibleQuote(book.getIsBibleBook());
		}

		mapToEntity(quoteDTO, quote);

		// Auto detecting tags
		Set<String> tagSet = tagRepository.findAll().stream().map(tag -> tag.getName()).collect(Collectors.toSet());
		addAutoDetectedTagsToQuote(quote, tagSet);
		quoteRepository.save(quote);
	}

	public void delete(final Long id) {
		quoteRepository.deleteById(id);
	}

	private QuoteDTO mapToDTO(final Quote quote, final QuoteDTO quoteDTO) {
		quoteDTO.setId(quote.getId());
		quoteDTO.setQuote(quote.getQuote());
		quoteDTO.setAuthor(quote.getAuthor());
		quoteDTO.setCategory(quote.getCategory());
		quoteDTO.setType(quote.getType());
		quoteDTO.setBook(quote.getBook());
		quoteDTO.setChapter(quote.getChapter());
		quoteDTO.setVerse(quote.getVerse());
		quoteDTO.setTags(quote.getTags());
		quoteDTO.setIsBibleQuote(quote.getIsBibleQuote());
		return quoteDTO;
	}

	private Quote mapToEntity(final QuoteDTO quoteDTO, final Quote quote) {
		quote.setQuote(quoteDTO.getQuote());
		quote.setAuthor(quoteDTO.getAuthor());
		quote.setCategory(quoteDTO.getCategory());
		quote.setType(quoteDTO.getType());
		quote.setBook(quoteDTO.getBook());
		quote.setChapter(quoteDTO.getChapter());
		quote.setVerse(quoteDTO.getVerse());
		quote.setTags(quoteDTO.getTags());
		quote.setIsBibleQuote(quoteDTO.getIsBibleQuote());
		return quote;
	}

	public List<Quote> findByTypeAndCat(QuoteType type, String category) {
		return quoteRepository.findByTypeAndCat(type, category);
	}

	public List<QuoteDTO> createMany(List<QuoteDTO> quoteDTOList) {
		Set<String> tagSet = tagRepository.findAll().stream().map(tag -> tag.getName()).collect(Collectors.toSet());
		final List<QuoteDTO> failedQuotes = new ArrayList<>();

		for (QuoteDTO quoteDTO : quoteDTOList) {

			final Quote quote = new Quote();
			mapToEntity(quoteDTO, quote);
			try {
				addAutoDetectedTagsToQuote(quote, tagSet);
				quoteRepository.save(quote);
			} catch (Exception ex) {
				failedQuotes.add(quoteDTO);
			}
		}
		return failedQuotes;
	}

	public void addAutoDetectedTagsToQuote(Quote quote, Set<String> tagSet) {

		// Pattern to match each tag with word boundaries
		StringBuilder patternBuilder = new StringBuilder();
		for (String tag : tagSet) {
			if (patternBuilder.length() > 0) {
				patternBuilder.append("|");
			}
			patternBuilder.append("\\b").append(Pattern.quote(tag)).append("\\b");
		}
		Pattern pattern = Pattern.compile(patternBuilder.toString(), Pattern.CASE_INSENSITIVE);

		// Matcher to find matches in the quote
		Matcher matcher = pattern.matcher(quote.getQuote());

		// Set to store found tags
		Set<String> foundTags = new HashSet<>();

		// Find and add found tags to the set
		while (matcher.find()) {
			foundTags.add(matcher.group().toLowerCase()); // Store lower cased tags
		}
		if (quote.getTags() == null) {
			quote.setTags(foundTags);
		} else {
			quote.getTags().addAll(foundTags);
		}
	}

	public List<QuoteDTO> createManyWithObjs(List<QuoteDTO> quoteDTOList) {

		final List<QuoteDTO> failedQuotes = new ArrayList<>();

		for (QuoteDTO quoteDTO : quoteDTOList) {

			// Creating Quote Objects
			createTags(quoteDTO.getTags());
			createBook(quoteDTO.getBook(), quoteDTO.getAuthor(), quoteDTO.getIsBibleQuote());
			createAuthor(quoteDTO.getAuthor(), false);
			createCategory(quoteDTO.getCategory());

			try {
				final Quote quote = new Quote();
				mapToEntity(quoteDTO, quote);
				quoteRepository.save(quote);
			} catch (Exception ex) {
				failedQuotes.add(quoteDTO);
			}
		}
		return failedQuotes;
	}

	public void createTags(Set<String> newTagList) {

		if (newTagList == null)
			return;

		List<String> existingTagList = tagRepository.findAll().stream().map(c -> c.getName())
				.collect(Collectors.toList());

		for (String tagName : newTagList) {
			boolean isCatFound = existingTagList.contains(tagName);
			if (!isCatFound) {
				Tag tag = new Tag();
				tag.setName(tagName);
				try {
					tagRepository.save(tag);
				} catch (Exception e) {
				}
			}
		}

	}

	public void createAuthor(String authorName, boolean isBibleAuthor) {
		List<String> authors = authorRepository.findAll().stream().map(a -> a.getName()).collect(Collectors.toList());

		boolean isAuthorFound = authors.contains(authorName);
		if (!isAuthorFound) {
			Author author = new Author();
			author.setName(authorName);
			author.setIsBibleAuthor(isBibleAuthor);

			try {
				authorRepository.save(author);
			} catch (Exception e) {
			}
		}
	}

	public void createCategory(String cat) {
		List<String> cats = categoryRepository.findAll().stream().map(c -> c.getName()).collect(Collectors.toList());
		boolean isCatFound = cats.contains(cat);
		if (!isCatFound) {
			Category category = new Category();
			category.setName(cat);

			try {
				categoryRepository.save(category);
			} catch (Exception e) {
			}
		}
	}

	public void createBook(String bookName, String author, boolean isBibleBook) {
		List<String> books = bookRepository.findAll().stream().map(b -> b.getTitle()).collect(Collectors.toList());
		boolean isBookFound = books.contains(bookName);
		if (!isBookFound) {
			Book book = new Book();
			book.setTitle(bookName);
			book.setAuthor(author);
			book.setIsBibleBook(isBibleBook);
			try {
				bookRepository.save(book);
			} catch (Exception e) {
			}

			createAuthor(author, isBibleBook);
		}
	}

	public Long changeCategory(Long quoteId, String categoryName) {
		// Category category = categoryRepository.findById(catId).orElseThrow();
		Quote quote = quoteRepository.findById(quoteId).orElseThrow();
		quote.setCategory(categoryName);

		return quoteRepository.save(quote).getId();
	}

	public List<Map> getTagCounts() {
		GroupOperation groupByTags = Aggregation.group("tags").count().as("count");

		Aggregation aggregation = Aggregation.newAggregation(Aggregation.unwind("tags"), groupByTags);

		AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "quotes", Map.class);

		Map<String, Integer> tags = results.getMappedResults().stream()
				.collect(Collectors.toMap(entry -> (String) entry.get("_id"), entry -> (Integer) entry.get("count")));
		Integer nullCount = tags.get(null);
		tags.remove(null);
		tags.put("null", nullCount);

		return results.getMappedResults();
	}

	public List<Map> getSortedTagCounts() {
		List<Map> result = mongoTemplate.aggregate(
				Aggregation.newAggregation(Aggregation.unwind("tags"), Aggregation.sort(Sort.by("tags")),
						Aggregation.group("tags").count().as("count")),
				"quotes", // Collection name
				Map.class).getMappedResults();

		return result;
	}

	public List<Map> getTagCounts2(TagCatCountSearch search) {
		if (search.getSortBy().equalsIgnoreCase("name")) {
			search.setSortBy("_id");
		}
		
		AggregationOperation unwind = Aggregation.unwind("$" + search.getGroupBy());
		AggregationOperation group = Aggregation.group(search.getGroupBy()).count().as("count");
		AggregationOperation sort = Aggregation.sort(Sort.by(search.getSortOrder(), search.getSortBy()));

		Aggregation aggregation = Aggregation.newAggregation(unwind, group, sort);

		return mongoTemplate.aggregate(aggregation, "quotes", Map.class).getMappedResults();
	}

}
