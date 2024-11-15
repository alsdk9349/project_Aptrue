package aptrue.backend.Clip.Service;

import aptrue.backend.Clip.Dto.*;
import aptrue.backend.Clip.Dto.Request.ClipRQRequestDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ClipRQService {
    ClipRQResponseDto newClipRQ(ClipRQRequestDto clipRQRequestDto, HttpServletRequest httpServletRequest);
    ClipDetailResponseDto getDetail(HttpServletRequest httpServletRequest, int clip_id);
    CompleteResponseDto completeRQ(int clip_id, HttpServletRequest httpServletRequest);
    ClipOnlyResponseDto getVideosOnly(HttpServletRequest httpServletRequest, int clip_id);
    List<ClipListResponseDto> getClipList(HttpServletRequest httpServletRequest, int page, int limit);
    List<ClipListResponseDto> getClipAll(HttpServletRequest httpServletRequest);
}
