package tech.suji.quotes.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import tech.suji.quotes.dto.TagDTO;
import tech.suji.quotes.entity.Tag;
import tech.suji.quotes.repos.TagRepository;
import tech.suji.quotes.util.NotFoundException;

@Service
public class TagService {

	private final TagRepository tagRepository;

	public TagService(final TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	public List<TagDTO> findAll() {
		final List<Tag> tags = tagRepository.findAll(Sort.by("id"));
		return tags.stream().map(tag -> mapToDTO(tag, new TagDTO())).toList();
	}

	public TagDTO get(final Long id) {
		return tagRepository.findById(id).map(tag -> mapToDTO(tag, new TagDTO())).orElseThrow(NotFoundException::new);
	}

	public Long create(final TagDTO tagDTO) {
		final Tag tag = new Tag();
		tag.setName(tagDTO.getName().toLowerCase());
		return tagRepository.save(tag).getId();
	}

	public void update(final Long id, final TagDTO tagDTO) {
		final Tag tag = tagRepository.findById(id).orElseThrow(NotFoundException::new);
		tag.setName(tagDTO.getName().toLowerCase());
		tagRepository.save(tag);
	}

	public void delete(final Long id) {
		tagRepository.deleteById(id);
	}

	private TagDTO mapToDTO(final Tag tag, final TagDTO tagDTO) {
		tagDTO.setId(tag.getId());
		tagDTO.setName(tag.getName());
		return tagDTO;
	}

	public boolean nameExists(final String name) {
		return tagRepository.existsByNameIgnoreCase(name);
	}

}
