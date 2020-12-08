const AudioCompiler = (chunks, nameStation) => {
    const audioCtx = new AudioContext();
    const fileReaderOne = new FileReader();
    const fileReaderTwo = new FileReader();

    fileReaderOne.onload = function (e) {
        audioCtx.decodeAudioData(e.target.result).then(function (buffer) {
            const offlineAudioCtx = new OfflineAudioContext({
                numberOfChannels: 2,
                length: 44100 * buffer.duration,
                sampleRate: 44100,
            });

            let soundSource = offlineAudioCtx.createBufferSource();
            soundSource.buffer = buffer;
            soundSource.connect(offlineAudioCtx.destination);

            fileReaderTwo.onload = function () {
                offlineAudioCtx
                    .startRendering()
                    .then(function (renderedBuffer) {
                        makeDownload(
                            renderedBuffer,
                            offlineAudioCtx.length,
                            nameStation,
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            fileReaderTwo.readAsArrayBuffer(chunks[0]);
            soundSource.start(0);
        });
    };

    fileReaderOne.readAsArrayBuffer(chunks[0]);
};

const makeDownload = (abuffer, total_samples, nameStation) => {
    let url = URL.createObjectURL(bufferToWave(abuffer, total_samples));
    let link = document.createElement('a');
    link.href = url;
    link.download = nameStation + '.wav';
    document.body.appendChild(link);

    setTimeout(() => {
        link.click();
    }, 500);
};

const bufferToWave = (abuffer, len) => {
    let numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [],
        i,
        sample,
        offset = 0,
        pos = 0;

    // write WAVE header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit (hardcoded in this demo)

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // write interleaved data
    for (i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            // interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true); // write 16-bit sample
            pos += 2;
        }
        offset++; // next source sample
    }

    // create Blob
    return new Blob([buffer], { type: 'audio/wav' });

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
};

export default AudioCompiler;
