package artur.proj.userservice.services.impl;

import artur.proj.commonclasses.entities.UserEntity;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class UserEventPublisher {
    private final ApplicationEventPublisher eventPublisher;
    public UserEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
    public void publishEvent(UserEntity savedUser) {
        eventPublisher.publishEvent(savedUser);
    }
}
