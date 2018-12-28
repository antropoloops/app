// Audioset
export const SET_AUDIOSET = "[session] SET_AUDIOSET";
export const setAudioset = audioset => ({
  type: SET_AUDIOSET,
  audioset
});

// Pads
export const PRESS_PAD = "[session] PRESS_PAD";
export const pressPad = clipId => ({ type: PRESS_PAD, clipId });
export const RELEASE_PAD = "[session] RELEASE_PAD";
export const releasePad = clipId => ({ type: RELEASE_PAD, clipId });

// Audio
export const SET_AUDIO_CLIP_STATUS = "[session] SET_AUDIO_CLIP_STATUS";
export const startAudioClip = (clipId, trackId, time) => ({
  type: SET_AUDIO_CLIP_STATUS,
  clipId,
  trackId,
  status: { isPlaying: true, time }
});
export const stopAudioClip = (clipId, trackId, time) => ({
  type: SET_AUDIO_CLIP_STATUS,
  clipId,
  trackId,
  status: { isPlaying: false, time }
});

export const SET_AUDIO_STATUS = "[session] SET_AUDIO_STATUS";
export const setAudioStatus = (isPlaying, time) => ({
  type: SET_AUDIO_STATUS,
  status: { isPlaying, time }
});

export const AUDIO_STOP_ALL = "[session] AUDIO_STOP_ALL";
export const stopAudio = () => ({
  type: AUDIO_STOP_ALL
});

// Tracks
export const CHANGE_TRACK_VOLUME = "[session] CHANGE_TRACK_VOLUME";
export const changeTrackVolume = (trackId, volume) => ({
  type: CHANGE_TRACK_VOLUME,
  trackId,
  volume
});
