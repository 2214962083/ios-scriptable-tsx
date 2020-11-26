import {Attributes, ReactNode} from 'react'

export function h<P>(type: 'wbox' | 'wstack', props?: (Attributes & P) | null, ...children: ReactNode[]): any {
  console.log(type, props, children)
}
