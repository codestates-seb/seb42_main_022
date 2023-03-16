package community.config;

import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)//엔티티 Auditing이 동작하기위해 필수추가
@MappedSuperclass  //Jpa애너테이션
public class AuditingFields { // 공통 필드에 대한 처리

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) //파라미터 파싱에 대한 룰
    @CreatedDate
    @Column(nullable = false, updatable = false)
    protected LocalDateTime createdAt; // 생성일시
//    @CreatedBy
//    @Column(nullable = false, length = 100)//누가 만들었는지에 대한 정보 JpaConfig에서 확인
//    protected String createdBy; // 생성자
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) //파라미터 파싱에 대한 룰
    @LastModifiedDate
    @Column(nullable = false)
    protected LocalDateTime modifiedAt; // 수정일시
//    @LastModifiedBy
//    @Column(nullable = false, length = 100)
//    protected String modifiedBy; // 수정자
}
