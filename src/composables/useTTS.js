export function useTTS () {
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Text to Speech not supported')
      return
    }

    window.speechSynthesis.cancel()

    const msg = new SpeechSynthesisUtterance(text)
    msg.lang = 'en-US'   // or en-PH
    msg.rate = 0.9
    msg.pitch = 1
    msg.volume = 1

    window.speechSynthesis.speak(msg)
  }

  return { speak }
}
