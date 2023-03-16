package community.like.repository;

import community.board.entity.Board;
import community.like.entity.BoardLike;
import community.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
    BoardLike findByMemberAndBoard(Member member, Board board);
}
