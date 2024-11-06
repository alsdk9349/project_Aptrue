package aptrue.backend.Admin.Repository;

import aptrue.backend.Admin.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByAccount(String account);
    Optional<Admin> findByName(String name);
    Optional<Admin> findByAdminId(Integer adminID);
    Optional<Admin> findByPhone(String phone);
}
