package tech.suji.quotes.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.client.result.UpdateResult;

import jakarta.validation.Valid;
import tech.suji.quotes.dto.QuoteType;
import tech.suji.quotes.dto.SearchQuote;
import tech.suji.quotes.entity.Quote;
import tech.suji.quotes.service.QuoteSearchService;
import tech.suji.quotes.service.QuoteService;

@RestController
@CrossOrigin(origins = "*")

@RequestMapping(value = "/api/quotes/v2/", produces = MediaType.APPLICATION_JSON_VALUE)
public class QuoteSearchController {

	@Autowired
	private QuoteService quoteService;

	@Autowired
	private QuoteSearchService quoteSearchService;

	@GetMapping("/update/{category}/{tag}")
	public UpdateResult updateRecord(@PathVariable String category, @PathVariable String tag) {
		return quoteSearchService.updateManyRecords(category, tag);
	}

	@PatchMapping("/add-tag/{tagName}")
	public UpdateResult addTagBySearchData(@RequestBody final SearchQuote searchQuote,
			@PathVariable final String tagName) {
		return quoteSearchService.addTagToMany(searchQuote, tagName);
	}

	@PostMapping("/find")
	public List<Quote> findBySearchData(@RequestBody final SearchQuote searchQuote) {
		return quoteSearchService.findBySearchData(searchQuote);
	}

	@PostMapping("/pros")
	public List<Quote> getJSON(@RequestBody ArrayList<ArrayList<String>> myArray) {
		System.out.println("Inside getJSON");
		var quoteList = new ArrayList<Quote>();
		for (ArrayList<String> arr : myArray) {
			String ref = arr.get(0);
			String quote = arr.get(1);
			String[] split = ref.split(" ");
			String ver = split[1];
			String[] split2 = ver.split(":");
			int chapter = Integer.parseInt(split2[0]);
			int verse = Integer.parseInt(split2[1]);

			Quote q = new Quote();
			q.setQuote(quote);
			q.setChapter(chapter);
			q.setVerse(verse);
			q.setAuthor("Solomon");
			q.setBook(split[0].strip());
			q.setIsBibleQuote(true);
			q.setType(QuoteType.BIBLE);
			quoteList.add(q);
			System.out.println(q);
		}

		return quoteList;
	}

	@PostMapping("/search/v1")
	public ResponseEntity<List<Quote>> searchQuote(@RequestBody @Valid final SearchQuote searchQuote) {
		return ResponseEntity.ok(quoteService.findByTypeAndCat(searchQuote.getType(), searchQuote.getCategory()));
	}

	/**
	 * If page number is 1, it will return 0th page elements. As PageNumber starting
	 * from 0 still not impl in this version.
	 * 
	 * @param searchQuote
	 * @return
	 */
	@PostMapping("/search/v2")
	public ResponseEntity<Page<Quote>> searchQuoteV2(@RequestBody @Valid final SearchQuote searchQuote) {
		return ResponseEntity.ok(quoteSearchService.findWithDynamicCriteria(searchQuote));
	}

	@PostMapping("/search/v3")
	public ResponseEntity<Page<Quote>> searchQuoteV3(@RequestBody @Valid final SearchQuote searchQuote) {
		return ResponseEntity.ok(quoteSearchService.findWithDynamicCriteriaV3(searchQuote));
	}
}