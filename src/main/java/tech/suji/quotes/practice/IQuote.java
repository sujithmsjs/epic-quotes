package tech.suji.quotes.practice;

import lombok.Data;
import tech.suji.quotes.dto.QuoteType;
import tech.suji.quotes.entity.Quote;

@Data
public class IQuote {
	String quote;
	String tags;
	QuoteType type;
}
