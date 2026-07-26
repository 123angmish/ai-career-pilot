import { useMutation } from '@tanstack/react-query';
import { jdMatchService } from '../services/jdMatch.service';
import type { JDMatchRequest } from '../types/jdMatch';

export function useJDMatch() {
  return useMutation({
    mutationKey: ['jd-match'],
    mutationFn: (request: JDMatchRequest) => jdMatchService.analyze(request),
  });
}
