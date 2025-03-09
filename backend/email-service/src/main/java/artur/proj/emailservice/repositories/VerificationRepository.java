package artur.proj.emailservice.repositories;

import artur.proj.commonclasses.entities.UserVerificationEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends CrudRepository<UserVerificationEntity, String> {
}
