package artur.proj.boardservice.services;

import artur.proj.boardservice.core.dtos.TagDTO;
import artur.proj.commonclasses.entities.TagEntity;

import java.util.List;

public interface TagService {
    List<TagDTO> getAll();

    TagEntity getByTag(String tag);
}
