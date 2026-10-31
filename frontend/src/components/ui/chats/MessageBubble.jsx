import React from 'react'
import { Message, MessageContent } from '../message'
import { Bubble, BubbleContent } from '../bubble'

export default function MessageBubble({message, isSentByMe}) {
  return (
    <div>
      <Message
                align={isSentByMe ? "end" : "start"}
                className="items-end gap-2"
              >
                <MessageContent className="max-w-[85%] sm:max-w-[75%]">
                  <Bubble
                    variant={isSentByMe ? "default" : "muted"}
                    className={
                      isSentByMe
                        ? "rounded-2xl rounded-br-sm bg-slate-900 text-white"
                        : "rounded-2xl rounded-bl-sm bg-white"
                    }
                  >
                    <BubbleContent className="text-sm leading-6">
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Shared image"
                          className="m-0 p-0 max-h-72 rounded-lg object-contain"
                          loading="lazy"
                        />
                      )}

                      {message.text && <p>{message.text}</p>}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
    </div>
  )
}
