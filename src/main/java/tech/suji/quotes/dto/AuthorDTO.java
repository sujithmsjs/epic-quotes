package tech.suji.quotes.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthorDTO {

    private Long id;

    @NotNull
    @Size(max = 30)
    private String name;
    
    private Boolean isBibleAuthor;
}
