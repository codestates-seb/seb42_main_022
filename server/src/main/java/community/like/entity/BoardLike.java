package community.like.entity;

import community.board.entity.Board;
import community.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@RequiredArgsConstructor
public class BoardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardLikeId;
    private boolean bLikeStatus; //좋아요 누름 상태

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    public boolean getBLikeStatus(){
        return bLikeStatus;
    }
}