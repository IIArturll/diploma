package artur.proj.boardservice.services;

import java.util.UUID;

public interface BoardUserAccessService {
    void sendInvite(UUID boardId, String email);

    void respondInvite(UUID inviteCode, boolean accept);

    void kickUser(UUID boardId, String email);
}
