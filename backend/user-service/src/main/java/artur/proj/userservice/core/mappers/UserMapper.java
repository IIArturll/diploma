package artur.proj.userservice.core.mappers;

import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.security.MyUserDetails;
import artur.proj.userservice.core.dtos.UserCreateDTO;
import artur.proj.userservice.core.dtos.UserDTO;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserDTO toDto(UserEntity userEntity);
    @Mapping(target = "email",source = "email")
    @Mapping(target = "username", source = "username")
    @Mapping(target = "password", source = "password")
    UserEntity toEntity(UserCreateDTO userCreateDTO);
    MyUserDetails toMyUserDetailsService(UserEntity userEntity);
}