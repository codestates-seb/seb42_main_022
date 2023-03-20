package community.board.controller;

import community.board.dto.BoardDto;
import community.board.dto.UploadDto;
import community.board.entity.Board;
import community.board.entity.UploadFile;
import community.board.service.S3Service;
import community.member.entity.Level;
import community.member.mapper.MemberMapper;
import community.member.service.MemberService;
import community.type.SearchType;
import community.board.mapper.BoardMapper;
import community.board.service.BoardService;
import community.globaldto.SingleResponseDto;
import community.like.dto.BoardLikeDto;
import community.like.service.BoardLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
@Validated
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper boardMapper;
    private final BoardLikeService boardLikeService;
    private final S3Service s3Service;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> createBoard(@ModelAttribute MultipartFile[] files,
                                    @ModelAttribute BoardDto.Post boardPostDto) throws Exception {
        Board board = boardMapper.boardPostToBoard(boardPostDto);
        board.setMember(memberService.findVerifiedMember(boardPostDto.getMemberId()));
        Board boardCreate = boardService.createBoard(board);

        List<UploadFile> uploadFiles = s3Service.uploadFiles(files, boardCreate); // aws s3업로드
        List<UploadDto> uploadResponse = boardMapper.uploadFilesToUploadDtoList(uploadFiles); //업로드 dto리스트를 생성

        BoardDto.TotalPageResponse response = boardMapper.boardToBoardTotalPageResponse(boardCreate, uploadResponse);//게시글 dto에 업로드 dto담아주기
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity<?> updateBoard(@PathVariable("board-id") @Positive long boardId,
                                         @ModelAttribute MultipartFile[] files,
                                         @ModelAttribute BoardDto.Patch boardPatchDto) throws Exception {
        Board board = boardMapper.boardPatchToBoard(boardPatchDto);
        board.setBoardId(boardId);
        Board updateBoard = boardService.updateBoard(board);

        List<UploadFile> uploadFiles = s3Service.uploadFiles(files, updateBoard); // aws s3업로드
        List<UploadDto> uploadResponse = boardMapper.uploadFilesToUploadDtoList(uploadFiles); //업로드 dto리스트를 생성

        BoardDto.TotalPageResponse response = boardMapper.boardToBoardTotalPageResponse(updateBoard, uploadResponse); //게시글 dto에 업로드 dto담아주기
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /*검색 및 전체조회*/
    @GetMapping //부분검색 //http://localhost:8080/boards?searchType=CONTENTS&searchValue=검색어
    public ResponseEntity<?> searchBoards(@RequestParam(required = false) SearchType searchType,//required = false - 선택적 파라미터
                                          @RequestParam(required = false) String searchValue,
                                          @PageableDefault(size = 30, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) throws Exception //페이지 기본값
    {
        boardService.nameAndLevelUpdate(); //작성자들의 레벨 및 이름 업데이트
        
        Page<Board> boardPage = boardService.findBoards(searchType, searchValue, pageable);
        List<Board> boards = boardPage.getContent();

        List<BoardDto.TotalPageListResponse> response = boardMapper.boardToBoardListResponse(boards);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*추천 게시판*/
    @GetMapping("/rankBoards")
    public ResponseEntity<?> rankBoards(@PageableDefault(size = 5, sort = "likeCount", direction = Sort.Direction.DESC) Pageable pageable) //페이지 기본값
    {
        Page<Board> boardPage = boardService.rankBoards(pageable);
        List<Board> boards = boardPage.getContent();
        List<BoardDto.RankResponse> response = boardMapper.boardToBoardRankListResponse(boards);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*단건조회*/
    @GetMapping("/{board-id}")
    public ResponseEntity<?> getBoardById(@PathVariable("board-id") @Positive long boardId) throws Exception {
        boardService.updateViewCount(boardId); // 조회수 증가
        Board board = boardService.findBoard(boardId);

        List<UploadFile> uploadFiles = s3Service.uploadFiles(null, board); // aws s3업로드
        List<UploadDto> uploadResponse = boardMapper.uploadFilesToUploadDtoList(uploadFiles); //업로드 dto생성
        BoardDto.DetailPageResponse response = boardMapper.boardToBoardDetailPageResponse(board, uploadResponse); //게시글+ 업로드 dto 리스폰스

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity<?> deleteBoard(@PathVariable("board-id") @Positive long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{board-id}/Like")
    public ResponseEntity<?> upLikeBoard(@Positive @PathVariable("board-id") long boardId,
                                         @Valid @RequestBody BoardLikeDto requestBody) {

        Board likeBoard = boardLikeService.boardLikeUP(requestBody.getMemberId(), boardId);
        BoardDto.RankResponse response = boardMapper.boardToBoardRankResponse(likeBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
}