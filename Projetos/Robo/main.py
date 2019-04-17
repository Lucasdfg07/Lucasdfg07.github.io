#-*- coding: utf-8 -*-
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

import pyttsx3

import speech_recognition as sr

bot = ChatBot('Charles')

trainer.ListTrainer(bot)

for _file in os.listdir('chats'):
    lines = open('chats/' + _file, 'r').readlines()

    trainer.train(lines)

"""
r = sr.Recognizer()

with sr.Microphone() as s:
    r.adjust_for_ambient_noise(s)

    while True:
        audio = r.listen(s)
        speech = r.recognize_google(audio, language='pt')

        print('Você disse: ',speech)
"""
