package aptrue.backend.Apartment.Repository;

import aptrue.backend.Apartment.Entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentRepository extends JpaRepository<Apartment,Integer> {
}
