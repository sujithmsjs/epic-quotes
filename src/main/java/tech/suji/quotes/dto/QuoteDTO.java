package tech.suji.quotes.dto;

import java.util.Set;

import jakarta.validation.constraints.Size;
import lombok.Data;



@Data
public class QuoteDTO {

    private Long id;

    @Size(max = 255)
    private String quote;

    @Size(max = 30)
    private String author;

    @Size(max = 20)
    private String category;

    private QuoteType type;
    
    @Size(min = 1)
    private Set<String> tags;
    
    private Set<Long> similarQuotes;

    @Size(max = 50)
    private String book;

    private Integer chapter;

    private Integer verse;
    
    private Boolean isBibleQuote;

}
