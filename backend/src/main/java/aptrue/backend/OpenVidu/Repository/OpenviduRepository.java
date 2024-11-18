package aptrue.backend.OpenVidu.Repository;

import aptrue.backend.OpenVidu.Entity.Openvidu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenviduRepository extends JpaRepository<Openvidu, Integer> {
}
