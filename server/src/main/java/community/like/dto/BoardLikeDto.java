package community.like.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
public class BoardLikeDto {
    @Positive
    @NotNull
    private Long memberId;
}
