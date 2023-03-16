package community.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import community.comment.entity.Comment;
import community.config.AuditingFields;
import community.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@ToString(callSuper = true)
public class Board extends AuditingFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;
    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private int likeCount;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int viewCount;
    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;
    @JsonIgnore // 순환참조 방지
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // 순환참조 방지
    private List<Comment> comments = new ArrayList<>();

    @JsonIgnore // 순환참조 방지
    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL, orphanRemoval = true) // 게시판과 생명주기 동일하게 관리
    @ToString.Exclude // ToString
    private List<UploadFile> uploadFiles = new ArrayList<>();

    //equals 해시코드 기능 생성 / id가 같으면 같은게시물로 취급
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Board board = (Board) o;
        return boardId!=null && boardId.equals(board.boardId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(boardId);
    }
}
