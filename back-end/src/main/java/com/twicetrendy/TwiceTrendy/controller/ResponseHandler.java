package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.dto.ErrorDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ResponseHandler {

    protected static ResponseEntity<Object> handleNotAcceptable(final String errorMessage) {
        final ErrorDto error = new ErrorDto();
        error.message = errorMessage;
        error.statusCode = HttpStatus.BAD_REQUEST.value();
        return new ResponseEntity<>(error, new HttpHeaders(), HttpStatus.NOT_ACCEPTABLE);
    }

    protected static ResponseEntity<Object> handleNotFound(final String errorMessage) {
        final ErrorDto error = new ErrorDto();
        error.message = errorMessage;
        error.statusCode = HttpStatus.NOT_FOUND.value();
        return new ResponseEntity<>(error, new HttpHeaders(), HttpStatus.NOT_FOUND);
    }
    public static ResponseEntity<Object> generateResponseForLogIn(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);
        map.put("userId", responseObj);

        return new ResponseEntity<>(map,status);
    }

    public static ResponseEntity<Object> generateResponseWithData(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);
        map.put("data", responseObj);

        return new ResponseEntity<>(map,status);
    }

    public static ResponseEntity<Object> generateGeneralResponse(String message, HttpStatus status) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);

        return new ResponseEntity<>(map,status);
    }

}
