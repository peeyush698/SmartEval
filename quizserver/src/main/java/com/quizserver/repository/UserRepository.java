package com.quizserver.repository;

import com.quizserver.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.quizserver.enums.UserRole;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByRole(UserRole role);

    User findFirstByEmail(String email);

    Optional<User> findByEmail(String email);
}
