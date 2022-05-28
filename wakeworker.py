from pocketsphinx import LiveSpeech
speech = LiveSpeech(lm=False, keyphrase='alexa', kws_threshold=1e-18, )
for phrase in speech:
    print(phrase.segments(detailed=True)[0])
    

