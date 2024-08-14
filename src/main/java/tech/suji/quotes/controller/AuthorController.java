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

import tech.suji.quotes.dto.AuthorDTO;
import tech.suji.quotes.service.AuthorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/authors", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(final AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public ResponseEntity<List<AuthorDTO>> getAllAuthors() {
        return ResponseEntity.ok(authorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorDTO> getAuthor(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(authorService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createAuthor(@RequestBody @Valid final AuthorDTO authorDTO) {
        final Long createdId = authorService.create(authorDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateAuthor(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final AuthorDTO authorDTO) {
        authorService.update(id, authorDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteAuthor(@PathVariable(name = "id") final Long id) {
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
