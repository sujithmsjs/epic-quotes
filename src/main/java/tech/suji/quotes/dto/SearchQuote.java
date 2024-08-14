package tech.suji.quotes.dto;

import java.util.Set;

import org.springframework.data.domain.Sort;

import lombok.Data;

@Data
public class SearchQuote {
	private String quote;
	private String author;
	private String category;
	private QuoteType type;
	private Set<String> tags;
	private String book;
	private Integer pageNo;
	private Integer pageSize;
	private String sortBy;
	private Integer chapter;
	private Sort.Direction sortOrder;
}
