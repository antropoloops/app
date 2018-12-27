// Audioset
export const SET_AUDIOSET = "SET_AUDIOSET";
export const setAudioset = audioset => ({
  type: SET_AUDIOSET,
  audioset
});

// Pads
export const PRESS_PAD = "PRESS_PAD";
export const pressPad = clipId => ({ type: PRESS_PAD, clipId });
export const RELEASE_PAD = "RELEASE_PAD";
export const releasePad = clipId => ({ type: RELEASE_PAD, clipId });

// Audio
export const SET_AUDIO_CLIP_STATUS = "SET_AUDIO_CLIP_STATUS";
export const startAudioClip = (clipId, time) => ({
  type: SET_AUDIO_CLIP_STATUS,
  clipId,
  status: { isPlaying: true, time }
});
export const stopAudioClip = (clipId, time) => ({
  type: SET_AUDIO_CLIP_STATUS,
  clipId,
  status: { isPlaying: false, time }
});

export const SET_AUDIO_STATUS = "SET_AUDIO_STATUS";
export const setAudioStatus = (isPlaying, time) => ({
  type: SET_AUDIO_STATUS,
  status: { isPlaying, time }
});

export const AUDIO_STOP_ALL = "AUDIO_STOP_ALL";
export const stopAudio = () => ({
  type: AUDIO_STOP_ALL
});
