package tech.suji.quotes.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Document("authors")
@Getter
@Setter
public class Author {

	@Id
	private Long id;

	@Indexed(unique = true)
	@NotNull
	@Size(max = 30)
	private String name;

	@NotNull
	private Boolean isBibleAuthor;

//    @CreatedDate
//    private OffsetDateTime dateCreated;
//
//    @LastModifiedDate
//    private OffsetDateTime lastUpdated;
//
//    @Version
//    private Integer version;

}
