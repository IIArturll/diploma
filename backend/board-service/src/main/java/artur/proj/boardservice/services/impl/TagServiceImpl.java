package artur.proj.boardservice.services.impl;

import artur.proj.boardservice.core.dtos.TagDTO;
import artur.proj.boardservice.core.mappers.Mappers;
import artur.proj.boardservice.repositories.TagRepository;
import artur.proj.boardservice.services.TagService;
import artur.proj.commonclasses.entities.TagEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    private final Mappers mapper;

    public TagServiceImpl(TagRepository tagRepository, Mappers mapper) {
        this.tagRepository = tagRepository;
        this.mapper = mapper;
    }

    @Override
    public List<TagDTO> getAll() {
        return mapper.toTagDTO(tagRepository.findAll());
    }

    @Override
    public TagEntity getByTag(String tag) {
        return tagRepository.findByTag(tag).orElse(new TagEntity(null, tag));
    }


}
