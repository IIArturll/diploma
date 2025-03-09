package artur.proj.boardservice.core.mappers;

import artur.proj.boardservice.core.dtos.*;
import artur.proj.commonclasses.entities.BoardEntity;
import artur.proj.commonclasses.entities.TagEntity;
import artur.proj.commonclasses.entities.TaskEntity;
import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.security.MyUserDetails;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface Mappers {

    BoardDTO toDTO(BoardEntity boardEntity);
    List<BoardDTO> toDTO(List<BoardEntity> boardEntityList);
    BoardEntity toEntity(BoardDTO boardDTO);
    BoardEntity toEntity(BoardCreateDTO boardCreateDTO);

    TaskEntity toEntity(TaskDTO taskDTO);
    TaskDTO toDTO(TaskEntity taskPositionEntity);

    MyUserDetails toMyUserDetails(UserEntity entity);
    List<TagDTO> toTagDTO(List<TagEntity> tagEntity);
    List<BoardNameDTO> toBoardNameDTO(List<BoardEntity> list);
}
