package tech.suji.quotes.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.suji.quotes.dto.TagDTO;
import tech.suji.quotes.service.TagService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/tags", produces = MediaType.APPLICATION_JSON_VALUE)
public class TagController {

	private final TagService tagService;

	public TagController(final TagService tagService) {
		this.tagService = tagService;
	}

	@GetMapping
	public ResponseEntity<List<TagDTO>> getAllTags() {
		return ResponseEntity.ok(tagService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<TagDTO> getTag(@PathVariable(name = "id") final Long id) {
		return ResponseEntity.ok(tagService.get(id));
	}

	@PostMapping
	@ApiResponse(responseCode = "201")
	public ResponseEntity<Long> createTag(@RequestBody @Valid final TagDTO tagDTO) {
		final Long createdId = tagService.create(tagDTO);
		return new ResponseEntity<>(createdId, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Long> updateTag(@PathVariable(name = "id") final Long id,
			@RequestBody @Valid final TagDTO tagDTO) {
		tagService.update(id, tagDTO);
		return ResponseEntity.ok(id);
	}

	@DeleteMapping("/{id}")
	@ApiResponse(responseCode = "204")
	public ResponseEntity<Void> deleteTag(@PathVariable(name = "id") final Long id) {
		tagService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
