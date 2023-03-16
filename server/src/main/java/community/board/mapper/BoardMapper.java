package community.board.mapper;

import community.board.dto.BoardDto;
import community.board.entity.Board;
import community.board.entity.UploadFile;
import community.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {
    Board boardPostToBoard(BoardDto.Post boardPostDto); //boardPostDto -> board

    Board boardPatchToBoard(BoardDto.Patch boardPatchDto); //boardPatchDto -> board

    BoardDto.DetailPageResponse boardToBoardDetailPageResponse(Board board);

    @Mapping(source = "uploadFiles", target = "uploadFiles")
    BoardDto.TotalPageResponse boardToBoardTotalPageResponse(Board board, List<UploadFile> uploadFiles); //uploadfile 매핑 / Post Patch

    List<BoardDto.TotalPageResponse> boardToBoardListResponse(List<Board> boards);
}