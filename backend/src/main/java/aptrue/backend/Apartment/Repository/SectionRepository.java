package aptrue.backend.Apartment.Repository;

import aptrue.backend.Apartment.Entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Integer> {
}
