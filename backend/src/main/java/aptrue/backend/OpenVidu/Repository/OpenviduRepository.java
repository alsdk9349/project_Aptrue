package aptrue.backend.OpenVidu.Repository;

import aptrue.backend.OpenVidu.Entity.Openvidu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OpenviduRepository extends JpaRepository<Openvidu, Integer> {
    Optional<Openvidu> findBySessionId(String sessionId);
}
