package artur.proj.boardservice.services.impl;

import artur.proj.commonclasses.entities.BoardUserAccessEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class BoardEventPublisher {
    private final ApplicationEventPublisher eventPublisher;
    @Autowired
    public BoardEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
    public void publishEvent(BoardUserAccessEntity savedEntity){
        eventPublisher.publishEvent(savedEntity);
    }
}
