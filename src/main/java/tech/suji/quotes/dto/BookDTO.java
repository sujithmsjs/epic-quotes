package tech.suji.quotes.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BookDTO {

    private Long id;

    @NotNull
    @Size(max = 50)
    private String title;

    @Size(max = 30)
    private String author;

    @NotNull
    @JsonProperty("isBibleBook")
    private Boolean isBibleBook;

}
