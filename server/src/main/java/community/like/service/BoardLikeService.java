package community.like.service;

import community.board.entity.Board;
import community.like.entity.BoardLike;
import community.member.entity.Member;
import community.board.service.BoardService;
import community.like.repository.BoardLikeRepository;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardLikeService {
    private final BoardLikeRepository boardLikeRepository;

    private final BoardService boardService;

    private final MemberService memberService;

    public Board boardLikeUP(long memberId, long boardId) {

        Member member = memberService.findMember(memberId);
        Board board = boardService.findBoard(boardId);

        BoardLike boardLike = boardLikeRepository.findByMemberAndBoard(member, board);

        if (boardLike == null) {
            boardLike = new BoardLike();
            boardLike.setBoard(board);
            boardLike.setMember(member);
            boardLike.setBLikeStatus(true);
            board.setLikeCount(board.getLikeCount() + 1);
        }

        else if (boardLike.getBLikeStatus()) {
            boardLike.setBLikeStatus(false);
            board.setLikeCount(board.getLikeCount() - 1);
        }

        else if (!boardLike.getBLikeStatus()) {
            boardLike.setBLikeStatus(true);
            board.setLikeCount(board.getLikeCount() + 1);
        }

        boardLikeRepository.save(boardLike);
        return boardService.findBoard(boardId);
    }
}