import {
  streamText as vercelStreamText,
  type CoreMessage,
  type LanguageModel,
} from 'ai'

export { useChat } from 'ai/react'
export type { CoreMessage, LanguageModel, UIMessage } from 'ai'

type StreamTextOptions = Parameters<typeof vercelStreamText>[0]

export interface CreateAIOptions {
  model: LanguageModel
  system?: string
  maxSteps?: number
}

export function streamText(options: StreamTextOptions) {
  return vercelStreamText(options)
}

export function createAI({ model, system, maxSteps }: CreateAIOptions) {
  return {
    streamText(options: Omit<StreamTextOptions, 'model'>) {
      return vercelStreamText({
        ...options,
        model,
        ...(system && !options.system ? { system } : {}),
        ...(maxSteps && options.maxSteps === undefined ? { maxSteps } : {}),
      })
    },
  }
}

export function trimMessages<TMessage>(messages: readonly TMessage[], maxMessages = 12) {
  if (maxMessages <= 0) {
    return []
  }

  return messages.slice(-maxMessages)
}

export interface CreateAgentKitOptions extends CreateAIOptions {
  maxMessages?: number
}

export function createAgentKit({ maxMessages = 12, ...aiOptions }: CreateAgentKitOptions) {
  const client = createAI(aiOptions)

  return {
    buildMessages(messages: readonly CoreMessage[]) {
      return trimMessages(messages, maxMessages)
    },
    streamText(options: Omit<StreamTextOptions, 'model' | 'messages'> & { messages: CoreMessage[] }) {
      return client.streamText({
        ...options,
        messages: trimMessages(options.messages, maxMessages),
      })
    },
  }
}
