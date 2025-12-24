package com.quizserver.dto;

import lombok.Data;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Data
public class SubmitTestDTO {

    private Long testId;

    private Long userId;

    private List<QuestionResponse> responses;
}
