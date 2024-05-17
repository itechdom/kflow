import nltk
from nltk.book import *


def getMostUniqueWords():
    f = open("assets/wiki.txt", "r")
    sentence = f.read()
    wordListFrequency = {}
    freqDist = FreqDist(text1)
    is_noun = lambda pos: pos[:2] == "NN"
    tokens = nltk.word_tokenize(sentence)
    tagged = nltk.pos_tag(tokens)
    nouns = [word for (word, pos) in nltk.pos_tag(tokens) if is_noun(pos)]
    entities = nltk.chunk.ne_chunk(tagged)
    # function that filters vowels
    def filterNouns(noun):
        if noun[0].isupper():
            return True
        else:
            return False

    cleanNouns = list(dict.fromkeys(nouns))
    filteredNouns = filter(filterNouns, cleanNouns)
    for noun in filteredNouns:
        wordListFrequency[noun] = freqDist[noun]
    sortedFreq = {
        k: v for k, v in sorted(wordListFrequency.items(), key=lambda item: item[1])
    }
    res = {}
    # res["nouns"] = list(filteredNouns)
    res["freq"] = sortedFreq
    return res
