package community.board.service;

import community.board.entity.Board;
import community.comment.entity.Comment;
import community.type.SearchType;
import community.board.repository.BoardRepository;
import community.exception.BusinessLogicException;
import community.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {
    private final BoardRepository boardRepository;

    /*게시글 등록*/
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    /*게시글 수정*/
    public Board updateBoard(Board board) {
        Board findBoard = findBoardById(board.getBoardId());

        Optional.ofNullable(board.getTitle()).ifPresent(findBoard::setTitle);
        Optional.ofNullable(board.getContents()).ifPresent(findBoard::setContents);

        return findBoard;
    }
    public Board findBoard(long boardId) {
        return findBoardById(boardId);
    }


    /*게시글 검색 및 조회*/
    @Transactional(readOnly = true) // 변경하지 않기때문에 readonly
    public Page<Board> findBoards(SearchType searchType, String search_keyword, Pageable pageable) {
        // 검색어 없이 검색하면 게시글 페이지를 반환.
        if (search_keyword == null || search_keyword.isBlank()) {
            return boardRepository.findAll(pageable);
        }
        // 항목에 따른 검색 - 조회
        switch (searchType) {
            case TITLE:
                return boardRepository.findByTitleContaining(search_keyword, pageable);
            case CONTENTS:
                return boardRepository.findByContentsContaining(search_keyword, pageable);
        }return null;
    }


    @Transactional
    public Page<Board> rankBoards(Pageable pageable){
        return boardRepository.findAll(pageable);
    }

    /*게시글 삭제*/
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    /*게시글 게시글ID 찾기*/
    public Board findBoardById(long boardId) {
        Optional<Board> optionalQuestion = boardRepository.findById(boardId);
        return optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    @Transactional
    public int updateViewCount(Long id) {
        return boardRepository.updateViewCount(id);
    }
}