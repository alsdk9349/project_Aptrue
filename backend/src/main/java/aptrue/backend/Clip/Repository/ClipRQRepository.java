package aptrue.backend.Clip.Repository;

import aptrue.backend.Clip.Entity.ClipRQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClipRQRepository extends JpaRepository<ClipRQ, Integer> {

    Optional<ClipRQ> findByPhone(String phone);

}
