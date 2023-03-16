package community.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
@NoArgsConstructor
@Setter @Getter
@Entity
public class UploadFile{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;
    private String fileName;
    private String imagePath;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board; //순환참조??


    public UploadFile(String fileName, String imagePath) {
        this.fileName = fileName;
        this.imagePath = imagePath;
    }
}
