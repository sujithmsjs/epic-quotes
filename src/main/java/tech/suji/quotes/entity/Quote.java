package tech.suji.quotes.entity;

import java.time.OffsetDateTime;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Size;
import lombok.Data;
import tech.suji.quotes.dto.QuoteType;


@Document("quotes")
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Quote {

    @Id
    private Long id;

    @Indexed(unique = true)
    @Size(max = 255)
    private String quote;

    @Size(max = 30)
    private String author;

    @Size(max = 20)
    private String category;

    private QuoteType type;

    @Size(max = 50)
    private String book;
    
    @Size(min = 1)
    private Set<String> tags;
    
    private Set<Long> similarQuotes;

    private Integer chapter;

    private Integer verse;
    
    private Boolean isBibleQuote;

    @CreatedDate
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    private OffsetDateTime lastUpdated;

    @Version
    private Integer version;

}
