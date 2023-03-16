package community.comment.mapper;

import community.board.entity.Board;
import community.comment.dto.CommentDto;
import community.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post commentPostDto);
    Comment commentPatchDtoToComment(CommentDto.Patch commentPatchDto);
    CommentDto.Response commentToCommentResponse(Comment comment);

    @Mapping(source = "board", target = "boardId", qualifiedByName = "boardId")
    CommentDto.InfoResponse commentToCommentInfoResponse(Comment comment);

    @Named("boardId")
    default long boardId(Board board) {return board.getBoardId();}

    List<CommentDto.InfoResponse> commentToCommentResponses(List<Comment> comments);
}