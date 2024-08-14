package tech.suji.quotes.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import tech.suji.quotes.dto.QuoteDTO;
import tech.suji.quotes.dto.TagCatCountSearch;
import tech.suji.quotes.service.QuoteService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/quotes", produces = MediaType.APPLICATION_JSON_VALUE)
public class QuoteController {

	@Autowired
	private QuoteService quoteService;

	@GetMapping
	public ResponseEntity<List<QuoteDTO>> getAllQuotes() {
		return ResponseEntity.ok(quoteService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<QuoteDTO> getQuote(@PathVariable(name = "id") final Long id) {
		return ResponseEntity.ok(quoteService.get(id));
	}

	@PatchMapping("/category/{quoteId}")
	public ResponseEntity<Long> changeCat(@RequestBody QuoteDTO quoteDTO,
			@PathVariable(name = "quoteId") final Long quoteId) {
		return ResponseEntity.ok(quoteService.changeCategory(quoteId, quoteDTO.getCategory()));
	}

	@PatchMapping("/auto-infer/{quoteId}")
	public ResponseEntity<Long> autoInferTags(@RequestBody QuoteDTO quoteDTO,
			@PathVariable(name = "quoteId") final Long quoteId) {
		quoteDTO.getQuote();
		// return ResponseEntity.ok(quoteService.changeCategory(quoteId,
		// quoteDTO.getCategory()));

		return ResponseEntity.ok(1L);
	}

	@PostMapping
	@ApiResponse(responseCode = "201")
	public ResponseEntity<Long> createQuote(@RequestBody @Valid final QuoteDTO quoteDTO) {
		final Long createdId = quoteService.create(quoteDTO);
		return new ResponseEntity<>(createdId, HttpStatus.CREATED);
	}

	@PostMapping("/add-similar")
	@ApiResponse(responseCode = "201")
	public ResponseEntity<Long> addSimilarQuote(@RequestBody @Valid final QuoteDTO quoteDTO) {
		final Long createdId = quoteService.createSimilarQuote(quoteDTO);
		return new ResponseEntity<>(createdId, HttpStatus.CREATED);
	}

	@PostMapping("add-many")
	@ApiResponse(responseCode = "201")
	public ResponseEntity<List<QuoteDTO>> createMany(@RequestBody @Valid final List<QuoteDTO> quoteDTOList) {

		// Validating Programmatically
		// https://reflectoring.io/bean-validation-with-spring-boot/

		List<QuoteDTO> failedQuotes = quoteService.createMany(quoteDTOList);
		return new ResponseEntity<>(failedQuotes, HttpStatus.CREATED);
	}

	@PostMapping("add-all-objects")
	@ApiResponse(responseCode = "201")
	public ResponseEntity<List<QuoteDTO>> createManyWithObjs(@RequestBody @Valid final List<QuoteDTO> quoteDTOList) {

		// Validating Programmatically
		// https://reflectoring.io/bean-validation-with-spring-boot/

		List<QuoteDTO> failedQuotes = quoteService.createManyWithObjs(quoteDTOList);
		return new ResponseEntity<>(failedQuotes, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Long> updateQuote(@PathVariable(name = "id") final Long id,
			@RequestBody @Valid final QuoteDTO quoteDTO) {
		quoteService.update(id, quoteDTO);
		return ResponseEntity.ok(id);
	}

	@DeleteMapping("/{id}")
	@ApiResponse(responseCode = "204")
	public ResponseEntity<Void> deleteQuote(@PathVariable(name = "id") final Long id) {
		quoteService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/tags-metrics")
	public List<Map> getTagsMetrics(@RequestBody TagCatCountSearch search) {
		return quoteService.getTagCounts2(search);
	}
	
	

}
