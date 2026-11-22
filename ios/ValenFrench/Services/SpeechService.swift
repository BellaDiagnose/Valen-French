import AVFoundation

/// 法语朗读（系统离线 TTS，无需音频文件）
final class SpeechService {
    static let shared = SpeechService()

    private let synthesizer = AVSpeechSynthesizer()
    private lazy var frenchVoice: AVSpeechSynthesisVoice? = AVSpeechSynthesisVoice(language: "fr-FR")
    private var sessionReady = false

    private init() {}

    func speak(_ text: String) {
        let clean = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !clean.isEmpty else { return }

        prepareSession()
        if synthesizer.isSpeaking {
            synthesizer.stopSpeaking(at: .immediate)
        }

        let utterance = AVSpeechUtterance(string: clean)
        utterance.voice = frenchVoice
        utterance.rate = 0.44
        utterance.pitchMultiplier = 1.0
        utterance.preUtteranceDelay = 0.02
        synthesizer.speak(utterance)
    }

    private func prepareSession() {
        guard !sessionReady else { return }
        sessionReady = true
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try? session.setActive(true, options: [])
    }
}
