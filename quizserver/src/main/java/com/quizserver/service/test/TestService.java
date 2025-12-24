package com.quizserver.service.test;

import com.quizserver.dto.*;
import com.quizserver.entities.Test;
import com.quizserver.entities.TestResult;

import java.util.List;

public interface TestService {

    TestDTO createTest(TestDTO dto);

    QuestionDTO addQuestionInTest(QuestionDTO dto);

    List<TestDTO> getAllTest();

    TestDetailsDTO getAllQuestionsByTest(Long id);

    TestResultDTO submitTest(SubmitTestDTO request);

    List<TestResultDTO> getAllTestResults();

    List<TestResultDTO> getAllResultsOfUser(Long userId);

    void deleteTestById(Long id);

}
