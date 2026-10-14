import type { FieldKey } from './orchestrator'

export type QuestionCopy = {
  eyebrow: string
  title: string
  support: string
  placeholder: string
  hint: string
}

const COPY: Record<FieldKey, QuestionCopy> = {
  idea: {
    eyebrow: 'Your idea',
    title: "What's been growing in your imagination?",
    support: 'An idea you want to bring to life, or something you wish worked better.',
    placeholder: "Tell us what you're imagining...",
    hint: 'A few sentences is a great place to start.',
  },
  motivation: {
    eyebrow: 'The spark',
    title: 'What sparked it?',
    support: 'Choose any that fit. More than one is welcome.',
    placeholder: 'Tell us what set this in motion...',
    hint: 'A rough answer is plenty.',
  },
  audience: {
    eyebrow: "Who it's for",
    title: "Who's this for?",
    support: "Tell us a little about the people you'd love to help.",
    placeholder: 'Describe the people you have in mind...',
    hint: '',
  },
  purpose: {
    eyebrow: "What it's for",
    title: "What's this for?",
    support: 'Your own business, your customers, or a new venture.',
    placeholder: 'Say a little more if you want...',
    hint: '',
  },
  outcome: {
    eyebrow: 'The change',
    title: "What's different when this is working beautifully?",
    support: 'Picture it out in the world.',
    placeholder: 'Describe what changes...',
    hint: '',
  },
  starting_point: {
    eyebrow: 'Where we begin',
    title: 'What are we starting with?',
    support: 'A fresh idea, a few sketches, an existing product, or something in between.',
    placeholder: 'Tell us what already exists...',
    hint: '',
  },
  requested_help: {
    eyebrow: 'Where we can help',
    title: 'Where would you like us to jump in?',
    support: 'Choose any that fit. More than one is welcome.',
    placeholder: '',
    hint: '',
  },
  involvement: {
    eyebrow: 'Your part in it',
    title: 'Which parts are you excited to stay hands-on with?',
    support: 'Choose the one that fits.',
    placeholder: '',
    hint: '',
  },
  investment: {
    eyebrow: 'The investment',
    title: "What would you like to invest?",
    support: 'A rough range helps. Not sure yet is a fine answer.',
    placeholder: '',
    hint: '',
  },
  timing: {
    eyebrow: 'The timing',
    title: 'When are you hoping to bring this to life?',
    support: 'A season, a date, or not sure yet.',
    placeholder: '',
    hint: '',
  },
  decision_makers: {
    eyebrow: "Who's with you",
    title: "Who's bringing this to life with you?",
    support: 'You, a partner, or a wider team.',
    placeholder: '',
    hint: '',
  },
  boundaries: {
    eyebrow: 'Before we begin',
    title: 'Anything we should know before we get started?',
    support: 'Must-haves, boundaries, or a curveball.',
    placeholder: 'Add a note if something matters...',
    hint: '',
  },
  contact: {
    eyebrow: 'How to reach you',
    title: 'Who should we reach?',
    support: 'A name and email are enough. A company or project name is welcome.',
    placeholder: '',
    hint: '',
  },
  summary: {
    eyebrow: 'The picture so far',
    title: "Here's the picture we've put together.",
    support: "Change anything that doesn't sound like you, then send it for review.",
    placeholder: 'What should we change?',
    hint: '',
  },
}

export const FIELD_LABEL: Record<FieldKey, string> = {
  idea: 'Idea',
  motivation: 'Spark',
  audience: 'Audience',
  purpose: 'Purpose',
  outcome: 'Outcome',
  starting_point: 'Starting point',
  requested_help: 'Help you want',
  involvement: 'Your involvement',
  investment: 'Investment',
  timing: 'Timing',
  decision_makers: 'Decision makers',
  boundaries: 'Boundaries',
  contact: 'Contact',
  summary: 'Summary',
}

function plain(value: string) {
  return value.replaceAll('’', "'").replaceAll('“', '"').replaceAll('”', '"')
}

export function presentQuestion(focus: FieldKey | null, message: string): QuestionCopy {
  const copy = focus ? COPY[focus] : null
  if (!copy) {
    return {
      eyebrow: 'Introduction',
      title: message,
      support: '',
      placeholder: 'Write your answer...',
      hint: '',
    }
  }
  if (!message.trim()) return copy
  const text = plain(message)
  const title = plain(copy.title)
  const known = text.startsWith(title) || text.startsWith(title.replace(/\?$/, ''))
  if (known) return copy
  if (message.startsWith('I noted this')) {
    return { ...copy, support: message }
  }
  return { ...copy, title: message, support: '' }
}
