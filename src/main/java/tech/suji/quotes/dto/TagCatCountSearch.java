package tech.suji.quotes.dto;

import org.springframework.data.domain.Sort;

import lombok.Data;

@Data
public class TagCatCountSearch {
	private String groupBy;
	private String sortBy;
	private Sort.Direction sortOrder;
}
