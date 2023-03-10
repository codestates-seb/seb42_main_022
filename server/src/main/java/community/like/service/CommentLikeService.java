package community.like.service;

import community.comment.entity.Comment;
import community.comment.repository.CommentRepository;
import community.comment.service.CommentService;
import community.like.entity.CommentLike;
import community.like.repository.CommentLikeRepository;
import community.member.entity.Member;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CommentLikeService {

    private final CommentService commentService;
    private final MemberService memberService;
    private final CommentLikeRepository commentLikeRepository;


    public Comment commentLikeUp(long memberId, long commentId) {

        Member member = memberService.findVerifiedMember(memberId);
        Comment comment = commentService.findByComment(commentId);


        CommentLike commentLike = commentLikeRepository.findByMemberAndComment(member, comment);

        if (commentLike == null) {
            commentLike = new CommentLike();
            commentLike.setComment(comment);
            commentLike.setMember(member);
            commentLike.setCommentLikeStatus(CommentLike.CommentLikeStatus.UP);
            comment.setLikeCount(comment.getLikeCount() + 1);
        }
        else if (commentLike.getCommentLikeStatus() == CommentLike.CommentLikeStatus.DOWN) {
            commentLike.setCommentLikeStatus(CommentLike.CommentLikeStatus.UP);
            comment.setLikeCount(comment.getLikeCount() + 2);
        }
        else if (commentLike.getCommentLikeStatus() == CommentLike.CommentLikeStatus.UP) {
            commentLike.setCommentLikeStatus(CommentLike.CommentLikeStatus.NONE);
            comment.setLikeCount(comment.getLikeCount() - 1);
        }
        else if (commentLike.getCommentLikeStatus() == CommentLike.CommentLikeStatus.NONE) {
            commentLike.setCommentLikeStatus(CommentLike.CommentLikeStatus.UP);
            comment.setLikeCount(comment.getLikeCount() + 1);
        }

        commentLikeRepository.save(commentLike);
        return commentService.findByComment(commentId);
    }
}