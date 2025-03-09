package artur.proj.boardservice.controllers;

import artur.proj.boardservice.core.dtos.*;
import artur.proj.boardservice.services.BoardService;
import artur.proj.boardservice.services.BoardUserAccessService;
import artur.proj.boardservice.services.TagService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Validated
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService service;
    private final TagService tagService;
    private final BoardUserAccessService accessService;

    public BoardController(BoardService boardService,
                           TagService tagService,
                           BoardUserAccessService boardUserAccessService) {
        this.service = boardService;
        this.tagService = tagService;
        this.accessService = boardUserAccessService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody @Valid BoardCreateDTO dto) {
        service.create(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BoardDTO getById(@PathVariable("id") UUID id) {
        return service.getById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BoardNameDTO> getAllNamesOfBoard() {
        return service.getAllNamesOfBoard();
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody BoardDTO dto) {
        service.update(dto);
    }

    @PutMapping("/{id}/add")
    @ResponseStatus(HttpStatus.OK)
    public void addTask(@PathVariable("id") UUID boardId, @RequestBody @Valid TaskDTO dto) {
        service.addTask(boardId, dto);
    }

    @PutMapping("/{boardId}/remove/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public void removeTask(@PathVariable("boardId") UUID boardId, @PathVariable("taskId") UUID taskId) {
        service.removeTask(boardId, taskId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

    @GetMapping("/tags")
    @ResponseStatus(HttpStatus.OK)
    public List<TagDTO> getTags() {
        return tagService.getAll();
    }

    @PostMapping("/invite")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void sendInvite(@RequestParam("board") UUID board,
                           @RequestParam("email")
                           @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
                                   message = "illegal format of email,correct example: email@mail.ru , google@gmail.com")
                           String email) {
        accessService.sendInvite(board, email);
    }

    @PutMapping("/invite/respond")
    @ResponseStatus(HttpStatus.OK)
    public void respondToInvite(@RequestParam("code") UUID code, @RequestParam("accept") boolean accept) {
        accessService.respondInvite(code, accept);
    }

    @DeleteMapping("/kick")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    private void kick(@RequestParam("board") UUID board,
                      @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
                              message = "illegal format of email,correct example: email@mail.ru , google@gmail.com")
                      @RequestParam("email") String email) {
        accessService.kickUser(board, email);
    }
}
