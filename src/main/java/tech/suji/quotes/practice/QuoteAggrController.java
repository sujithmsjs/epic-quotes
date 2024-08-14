package tech.suji.quotes.practice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.suji.quotes.dto.SearchQuote;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/aggr", produces = MediaType.APPLICATION_JSON_VALUE)
public class QuoteAggrController {

	@Autowired
	private QuoteAggrService quoteAggrService;

	@GetMapping("/v1")
	public List<IQuote> v1() {
		return quoteAggrService.findIQuote();
	}

	@PostMapping("/sort")
	public List<IQuote> sortV2(@RequestBody  SearchQuote searchQuote) {
		return quoteAggrService.findIQuoteSorted(searchQuote);
	}
	
	@PostMapping("/sort2")
	public List<IQuote> sortV1(@RequestBody  SearchQuote searchQuote) {
		return quoteAggrService.findIQuoteSortedV1(searchQuote);
	}

}
