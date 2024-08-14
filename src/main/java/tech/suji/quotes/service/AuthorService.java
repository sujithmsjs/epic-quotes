package tech.suji.quotes.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import tech.suji.quotes.dto.AuthorDTO;
import tech.suji.quotes.entity.Author;
import tech.suji.quotes.repos.AuthorRepository;
import tech.suji.quotes.util.NotFoundException;

@Service
public class AuthorService {

	private final AuthorRepository authorRepository;

	public AuthorService(final AuthorRepository authorRepository) {
		this.authorRepository = authorRepository;
	}

	public List<AuthorDTO> findAll() {
		final List<Author> authors = authorRepository.findAll(Sort.by("id"));
		return authors.stream().map(author -> mapToDTO(author, new AuthorDTO())).toList();
	}

	public AuthorDTO get(final Long id) {
		return authorRepository.findById(id).map(author -> mapToDTO(author, new AuthorDTO()))
				.orElseThrow(NotFoundException::new);
	}

	public Long create(final AuthorDTO authorDTO) {
		final Author author = new Author();
		mapToEntity(authorDTO, author);
		return authorRepository.save(author).getId();
	}

	public void update(final Long id, final AuthorDTO authorDTO) {
		final Author author = authorRepository.findById(id).orElseThrow(NotFoundException::new);
		mapToEntity(authorDTO, author);
		authorRepository.save(author);
	}

	public void delete(final Long id) {
		authorRepository.deleteById(id);
	}

	private AuthorDTO mapToDTO(final Author author, final AuthorDTO authorDTO) {
		authorDTO.setId(author.getId());
		authorDTO.setName(author.getName());
		authorDTO.setIsBibleAuthor(author.getIsBibleAuthor());
		return authorDTO;
	}

	private Author mapToEntity(final AuthorDTO authorDTO, final Author author) {
		author.setName(authorDTO.getName());
		author.setIsBibleAuthor(authorDTO.getIsBibleAuthor());
		return author;
	}

	public boolean nameExists(final String name) {
		return authorRepository.existsByNameIgnoreCase(name);
	}

}
