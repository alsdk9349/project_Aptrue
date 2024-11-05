package aptrue.backend.Clip.Service;

import aptrue.backend.Clip.Dto.ClipRQRequestDto;
import aptrue.backend.Clip.Dto.ClipRQResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface ClipRQService {
    ClipRQResponseDto newClipRQ(ClipRQRequestDto clipRQRequestDto, HttpServletRequest httpServletRequest);
}
