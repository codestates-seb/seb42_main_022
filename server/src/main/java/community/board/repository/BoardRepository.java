package community.board.repository;

import com.querydsl.core.types.dsl.DateTimeExpression;
import com.querydsl.core.types.dsl.StringExpression;
import community.board.entity.Board;
import community.board.entity.QBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BoardRepository extends JpaRepository<Board, Long>,
        QuerydslPredicateExecutor<Board>, //해당 엔티티 안에있는 모든 검색기능을 추가해줌 // 완전 동일해야만 동작
        QuerydslBinderCustomizer<QBoard> // 부분검색, 대소문자 구분 등을 위함
{
    @Modifying //추천수
    @Query("update Board p set p.viewCount = p.viewCount + 1 where p.id = :id")
    int updateViewCount(Long id);

    //검색기능 관련
    Page<Board> findByTitleContaining(String title, Pageable pageable); //제목검색
    Page<Board> findByContentsContaining(String contents, Pageable pageable); //내용검색
    @Override
    default void customize(QuerydslBindings bindings, QBoard root){
        bindings.excludeUnlistedProperties(true);
        bindings.including(root.title, root.contents, root.createdAt); //검색 컬럼
        bindings.bind(root.title).first(StringExpression::containsIgnoreCase); // like '%${v}%'/ 부분검색
        bindings.bind(root.contents).first(StringExpression::containsIgnoreCase);
        bindings.bind(root.createdAt).first(DateTimeExpression::eq);//원하는 날짜검색 /시분초 동일하게 넣어야함
    }
}
