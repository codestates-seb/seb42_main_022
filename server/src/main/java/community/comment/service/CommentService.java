package community.comment.service;

import community.comment.entity.Comment;
import community.comment.repository.CommentRepository;
import community.exception.BusinessLogicException;
import community.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {

        Comment findComment = findByComment(comment.getCommentId());

        Optional.ofNullable(comment.getContents())
                .ifPresent(contents -> findComment.setContents(contents));

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findByComment(commentId);
    }

    public void deleteComment(long commentId) {
        commentRepository.deleteById(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        Page<Comment> findBoard = commentRepository.findAll(PageRequest.of(page, size, Sort.by("boardId").descending()));

        return findBoard;
    }



    public Comment findByComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}
