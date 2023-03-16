package community.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import community.board.entity.Board;
import community.config.AuditingFields;
import community.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@RequiredArgsConstructor
@Entity
public class Comment extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    
    @Column(nullable = false, length = 99999)
    private String contents;
    @Column(nullable = false)
    private int likeCount;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

}
