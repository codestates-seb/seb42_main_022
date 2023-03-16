package community.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import community.board.entity.Board;
import community.comment.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "member")
public class Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    String password;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    public Member(String email, String name, String phone, String password){
        this.email=email;
        this.name=name;
        this.phone=phone;
        this.password=password;
    }

    public enum MemberStatus{
        MEMBER_ACTIVE("온라인"),
        MEMBER_QUIT("로그아웃");

        @Getter
        private String status;

        MemberStatus(String status){
            this.status=status;
        }
    }

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
