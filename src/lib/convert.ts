import * as Tone from "tone";

export const SAMPLE_RATE = 16384;
export const DURATION_LIMIT = 30;

export function createHeaderFile(array: Uint8Array) {
    // split the array into chunks of 10
    const chunks = array.reduce((acc, _, i) => {
        if (i % 10 === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(array[i]);
        return acc;
    }, [] as number[][]);

    let header = `#ifndef AUDIO_H_
  #define AUDIO_H_
  #if ARDUINO >= 100
  #include "Arduino.h"
  #else
  #include "WProgram.h"
  #endif
  #define AUDIO_NUM_CELLS ${array.length}
  #define AUDIO_SAMPLERATE ${SAMPLE_RATE}
  CONSTTABLE_STORAGE(uint8_t) AUDIO_DATA [] = {
    ${chunks.map(chunk => chunk.join(', ')).join(',\n')}
  };
  #endif /* AUDIO_H_ */
    `;

    return header;
}

export function melodyToRaw(audio: Tone.ToneAudioBuffer) {
    const data = audio.getChannelData(0);

    const quantized = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        quantized[i] = Math.floor(data[i] * 128 + 128);
    }

    return quantized;
}

export function downloadRaw(data: Uint8Array, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export function downloadString(data: string, filename: string) {
    const blob = new Blob([data], { type: 'text/plain charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export function resample(array: Float32Array, newLength: number) {
    const newBuffer = new Float32Array(newLength);

    const lerp = (x0: number, x1: number, t: number) => x0 + (x1 - x0) * t;

    for (let i = 0; i < newLength; i++) {
        const x = i * (array.length - 1) / (newLength - 1);
        const x_prev = Math.floor(x);
        const x_next = Math.min(Math.floor(x) + 1, array.length - 1);

        const t = x - x_prev;

        newBuffer[i] = lerp(array[x_prev], array[x_next], t);
    }

    return newBuffer;
}

export function bufferToRaw(audio: AudioBuffer) {

    const channel = audio.getChannelData(0);

    const resampled = resample(channel, Math.floor(channel.length / audio.sampleRate * SAMPLE_RATE));

    // console.log( Math.floor(channel.length / audio.sampleRate * SAMPLE_RATE));
    // console.log(resampled);

    const quantized = new Uint8Array(resampled.length);
    for (let i = 0; i < resampled.length; i++) {
        quantized[i] = Math.floor((resampled[i] + 1) * 128);
    }
    
    return quantized;
}

export async function fileToBuffer(blob: Blob) {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audio = await blob.arrayBuffer();
    return await context.decodeAudioData(audio);
}



