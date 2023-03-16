package community.like.repository;

import community.comment.entity.Comment;
import community.like.entity.CommentLike;
import community.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByMemberAndComment(Member member, Comment comment);
}
