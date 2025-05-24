package vn.tdtu.shop.util.error;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.persistence.EntityNotFoundException;
import vn.tdtu.shop.util.response.RestResponse;

@RestControllerAdvice
public class GlobalException {

    // handle all exception
     @ExceptionHandler(Exception.class)
     public ResponseEntity<RestResponse<Object>> handleAllException(Exception ex)
     {
	     RestResponse<Object> res = new RestResponse<Object>();
	     res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
	     res.setMessage(ex.getMessage());
	     res.setError("Internal Server Error");
	     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
     }

    @ExceptionHandler(value = {
            UsernameNotFoundException.class,
            BadCredentialsException.class,
            InputInvalidException.class,
            IllegalStateException.class

    })
    public ResponseEntity<RestResponse<Object>> handleIdException(Exception ex) {
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError("Exception occurs...");
        res.setMessage(ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    // @ExceptionHandler(AuthorizationDeniedException.class)
    // public ResponseEntity<RestResponse<Object>>
    // handleAuthorizationDeniedException(AuthorizationDeniedException ex) {
    // RestResponse<Object> res = new RestResponse<>();
    // res.setStatusCode(HttpStatus.FORBIDDEN.value());
    // res.setError("FORBIDDEN");
    // res.setMessage(ex.getMessage());
    // return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    // }

    @ExceptionHandler(value = {
            NoResourceFoundException.class,
            EntityNotFoundException.class,
            ResourceNotFoundException.class
    })
    public ResponseEntity<RestResponse<Object>> handleNotFoundException(Exception ex) {
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.NOT_FOUND.value());
        res.setMessage(ex.getMessage());
        res.setError("404 Not Found");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> validationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();

        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getBody().getDetail());

        List<String> errors = fieldErrors.stream().map(f -> f.getDefaultMessage()).collect(Collectors.toList());
        res.setMessage(errors.size() > 1 ? errors : errors.get(0));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(value = {
            PermissionException.class,
    })
    public ResponseEntity<RestResponse<Object>> handlePermissionException(Exception ex) {
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.FORBIDDEN.value());
        res.setError("Forbidden");
        res.setMessage(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    }

    @ExceptionHandler(value = {
            StorageException.class,
    })
    public ResponseEntity<RestResponse<Object>> handleFileUploadException(Exception ex) {
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setMessage(ex.getMessage());
        res.setError("Lỗi upload file...");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<RestResponse<Object>> handleMissingParams(MissingServletRequestParameterException ex) {
        String paramName = ex.getParameterName();
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setMessage(ex.getMessage());
        res.setError("Tham số bắt buộc '" + paramName + "' không được truyền vào.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

}
