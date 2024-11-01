package aptrue.backend.Admin.Repository;

import aptrue.backend.Admin.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByAccount(String account);
    Optional<Admin> findByName(String name);
    Optional<Admin> findByAdminId(Integer adminID);
}
