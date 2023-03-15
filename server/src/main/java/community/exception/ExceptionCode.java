package community.exception;

import lombok.Getter;

public enum ExceptionCode {
    BOARD_CANNOT_CHANGE(403,"권한이 없습니다."),
    COMMENT_CANNOT_CHANGE(403,"질문을 수정할수 없습니다."),

    MEMBER_NOT_FOUND(404, "고객 정보를 찾을 수 없습니다."),
    BOARD_NOT_FOUND(404,"게시판 정보를 찾을 수 없습니다."),
    COMMENT_NOT_FOUND(404,"질문를 찾을 수 없습니다."),
    TOKEN_NOT_FOUND(404, "토큰 정보를 찾을 수 없습니다."),
    NOT_AUTHORIZED(404, "not authorized, 인증받지 않은 접근입니다"),
    PASSWORD_NOT_CONFIRMED(404, "암호가 확인되지 않습니다."),

    MEMBER_EXISTS(409, "고객 정보가 이미 존재합니다."),
    BOARD_EXISTS(409, "게시판 정보가 이미 존재합니다."),
    COMMENT_EXISTS(409,"댓글이 이미 존재합니다.");


    @Getter
    private final int status;


    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
