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


@Document("categories")
@Getter
@Setter
public class Category {

    @Id
    private Long id;

    @Indexed(unique = true)
    @NotNull
    @Size(max = 30)
    private String name;

//    @CreatedDate
//    private OffsetDateTime dateCreated;
//
//    @LastModifiedDate
//    private OffsetDateTime lastUpdated;
//
//    @Version
//    private Integer version;

}
