package tech.suji.quotes.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TagDTO {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String name;

}
