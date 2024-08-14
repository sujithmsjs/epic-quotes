package tech.suji.quotes.entity;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("books")
@Getter
@Setter
public class Book {

    @Id
    private Long id;

    @Indexed(unique = true)
    @NotNull
    @Size(max = 50)
    private String title;

    @Size(max = 30)
    private String author;

    @NotNull
    private Boolean isBibleBook;

//    @CreatedDate
//    private OffsetDateTime dateCreated;
//
//    @LastModifiedDate
//    private OffsetDateTime lastUpdated;
//
//    @Version
//    private Integer version;

}
