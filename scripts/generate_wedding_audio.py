import math
import struct
import wave
import os

def generate_wedding_audio():
    sample_rate = 44100
    duration = 24.0  # 24 seconds seamless loop
    num_samples = int(sample_rate * duration)
    
    # Auspicious Raga Mohanam (Equivalent to Major Pentatonic: C4, D4, E4, G4, A4, C5)
    # Fundamental C3 = 130.81 Hz
    base_freq = 261.63 # C4
    scale = {
        'S': base_freq,         # 261.63
        'R': base_freq * 9/8,   # 294.33
        'G': base_freq * 5/4,   # 327.04
        'P': base_freq * 3/2,   # 392.44
        'D': base_freq * 5/3,   # 436.05
        'S2': base_freq * 2,    # 523.25
        'R2': base_freq * 9/4,  # 588.67
        'G2': base_freq * 5/2,  # 654.08
    }

    # Melodic phrases (note, duration_beats)
    melody = [
        ('S', 2), ('R', 1), ('G', 1), ('P', 2), ('D', 2),
        ('S2', 3), ('D', 1), ('P', 2), ('G', 2),
        ('R', 2), ('G', 1), ('P', 1), ('D', 2), ('S2', 2),
        ('R2', 2), ('S2', 2), ('D', 2), ('P', 2),
        ('G', 3), ('P', 1), ('R', 2), ('G', 2),
        ('S', 4), ('P', 2), ('S', 2)
    ]
    total_beats = sum(dur for _, dur in melody)
    beat_duration = duration / total_beats

    # Precalculate note time intervals
    notes_timeline = []
    current_time = 0.0
    for note, beats in melody:
        dur = beats * beat_duration
        notes_timeline.append((current_time, current_time + dur, scale[note]))
        current_time += dur

    os.makedirs('assets/audio', exist_ok=True)
    out_wav = 'assets/audio/wedding-melody.wav'

    with wave.open(out_wav, 'w') as wav_file:
        wav_file.setnchannels(2)  # Stereo
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)

        frames = bytearray()
        
        for i in range(num_samples):
            t = i / sample_rate

            # 1. Tambura Drone (Sa + Pa + High Sa)
            # Gentle undulating modulation (chorus / beating)
            tambura_sa = math.sin(2 * math.pi * 130.81 * t) * 0.12
            tambura_sa_h = math.sin(2 * math.pi * 261.63 * t) * 0.06
            tambura_pa = math.sin(2 * math.pi * 196.00 * t) * 0.08
            tambura_shimmer = math.sin(2 * math.pi * 392.00 * t) * 0.03
            
            drone_env = 0.85 + 0.15 * math.sin(2 * math.pi * 0.25 * t)
            drone = (tambura_sa + tambura_sa_h + tambura_pa + tambura_shimmer) * drone_env

            # 2. Bansuri Flute Voice
            flute_val = 0.0
            for start, end, freq in notes_timeline:
                if start <= t < end:
                    note_t = t - start
                    note_dur = end - start
                    # Flute envelope: gentle breath attack and smooth release
                    if note_t < 0.08:
                        env = note_t / 0.08
                    elif note_t > note_dur - 0.08:
                        env = (note_dur - note_t) / 0.08
                    else:
                        env = 1.0
                    
                    # Vibrato
                    vib = 1.0 + 0.008 * math.sin(2 * math.pi * 5.2 * note_t)
                    f = freq * vib
                    
                    # Flute harmonics (warm breath tone)
                    h1 = math.sin(2 * math.pi * f * t)
                    h2 = 0.35 * math.sin(2 * math.pi * 2 * f * t)
                    h3 = 0.15 * math.sin(2 * math.pi * 3 * f * t)
                    h4 = 0.05 * math.sin(2 * math.pi * 4 * f * t)
                    
                    # Gentle breath air turbulence
                    breath = 0.02 * math.sin(2 * math.pi * (f * 1.618) * t)
                    
                    flute_val = (h1 + h2 + h3 + h4 + breath) * env * 0.28
                    break

            # 3. Soft Temple Bell / Chimes at start of phrase
            bell = 0.0
            if t < 4.0:
                bell_env = math.exp(-1.2 * t)
                bell = (math.sin(2 * math.pi * 1046.5 * t) + 0.5 * math.sin(2 * math.pi * 1567.98 * t)) * bell_env * 0.08

            # Combine with subtle stereo panning
            left_val = drone * 0.9 + flute_val * 0.95 + bell * 0.8
            right_val = drone * 1.1 + flute_val * 0.85 + bell * 1.0

            # Overall master fade in & fade out at ends for seamless looping
            fade_len = 0.5
            if t < fade_len:
                left_val *= (t / fade_len)
                right_val *= (t / fade_len)
            elif t > duration - fade_len:
                fade = (duration - t) / fade_len
                left_val *= fade
                right_val *= fade

            # Clamp and convert to 16-bit PCM integer
            left_int = int(max(-1.0, min(1.0, left_val)) * 32767)
            right_int = int(max(-1.0, min(1.0, right_val)) * 32767)

            frames.extend(struct.pack('<hh', left_int, right_int))

        wav_file.writeframes(frames)
    print(f"Generated classical wedding melody: {out_wav}")

if __name__ == '__main__':
    generate_wedding_audio()
